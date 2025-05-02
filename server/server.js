const { Pool } = require('pg');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

if (!process.env.JWT_SECRET || !process.env.DATABASE_URL) {
    throw new Error('Missing environment variables. Please check your .env file.');
}

// CREATING POOL CONNECTION
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

// SIGN-UP ROUTE
app.post('/api/signup', async (req, res) => {

    // grabs email, password inputs from request to sign up
    const { email, username, password } = req.body;

    try {
        // check if user email already exists
        const userEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userEmail.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const userName = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userName.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists, please choose a different one' });
        }

        // hash given password, with salt for additional security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // insert email, hashed password into user database
        await pool.query('INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3)', [email, username, hashedPassword]);

        // tell client it was able to process sign-up
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        // something went wrong
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// SIGN-IN ROUTE
app.post('/api/signin', async (req, res) => {

    // grabs email, password inputs from request to sign in
    const { email, password } = req.body;

    try {
        // check if email is in database
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0]
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // check is password matches what's stored in database
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});


// FETCH CONVERSATIONS
app.get('/api/conversations', async (req, res) => {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const result = await pool.query(
            `
            SELECT
              u.id AS user_id,
              u.email AS user_email,
              u.username AS user_username
            FROM messages m
            JOIN users u ON u.id = CASE
              WHEN m.sender_id = $1 THEN m.recipient_id
              ELSE m.sender_id
            END
            WHERE m.sender_id = $1 OR m.recipient_id = $1
            GROUP BY u.id, u.email, u.username;
            `,
            [userId]
        );

        const conversations = result.rows.map((row) => ({
            id: row.user_id,
            email: row.user_email,
            username: row.user_username, // now this will always be defined
        }));

        res.json({ conversations });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// FETCH SELECTED CONVERSATIONS
app.get('/api/conversations/:id/messages', async (req, res) => {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const otherUserId = req.params.id;

        const result = await pool.query(
            `
            SELECT m.*, u.username AS sender_username, u.id AS sender_id
            FROM messages m
            JOIN users u on m.sender_id = u.id
            WHERE (sender_id = $1 AND recipient_id = $2)
                OR (sender_id = $2 AND recipient_id = $1)
            ORDER BY created_at ASC;
            `,
            [userId, otherUserId]
        );

        const messages = result.rows.map((row) => ({
            senderId: row.sender_id,
            senderUsername: row.sender_username,
            content: row.message,
            timestamp: row.created_at,
        }));

        res.json({ messages });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// START NEW CONVERSATION
app.get('/api/users', async (req, res) => {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];

    if (!token) {
        return res.status(401).json({ messages: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const result = await pool.query(`
        SELECT id, username
        FROM users
        WHERE id != $1
            AND id NOT IN (
                SELECT CASE
                    WHEN sender_id = $1 THEN recipient_id
                    ELSE sender_id
                END
                FROM messages
                WHERE sender_id = $1 OR recipient_id = $1
            )
        `, [userId]);

        res.json({ users: result.rows });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// SEND MESSAGE IN EXISTING CONVERSATION
app.post('/api/conversations/:id/messages', async (req, res) => {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { content } = req.body;
    const recipientId = req.params.id;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const senderId = decoded.id;

        await pool.query(
            'INSERT INTO messages (sender_id, recipient_id, message) VALUES ($1, $2, $3)', [senderId, recipientId, content]
        );

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET ME
app.get('/api/me', async (req, res) => {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const result = await pool.query(
            'SELECT id, email, username FROM users WHERE id = $1',
            [userId]
        );

        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: user.id,
            email: user.email,
            username: user.username,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


// set up and run websocket server
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('New client connected: ', socket.id);

    socket.on('register', (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on('send_message', async ({ senderId, recipientId, content }) => {
        try {
            // Save message
            await pool.query(
                'INSERT INTO messages (sender_id, recipient_id, message) VALUES ($1, $2, $3)',
                [senderId, recipientId, content]
            );

            // Get sender's username
            const senderRes = await pool.query('SELECT username FROM users WHERE id = $1', [senderId]);
            const senderUsername = senderRes.rows[0]?.username || 'Unknown';

            const messageData = {
                senderId,
                senderUsername,
                content,
                timestamp: new Date().toISOString(),
            };

            const senderSocketId = onlineUsers.get(senderId);
            if (senderSocketId) {
                io.to(senderSocketId).emit('receive_message', messageData);
            }

            const recipientSocketId = onlineUsers.get(recipientId);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('receive_message', messageData);
            }

        } catch (err) {
            console.error('Error saving or sending message:', err);
        }
    });

    socket.on('disconnect', () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
        console.log('Client disconnected:', socket.id);
    });

});


server.listen(6543, '0.0.0.0', () => {
    console.log('🚀 Server is running on http://0.0.0.0:6543');
});


// TESTING CONNECTION
// pool.connect()
//   .then(() => {
//     console.log("✅ Connected to Supabase DB!");
//     return pool.end();
//   })
//   .catch(err => {
//     console.error("❌ Connection failed:", err);
//   });

