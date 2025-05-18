const { Pool } = require('pg');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,              
  };
  
  app.use(cors(corsOptions));

app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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
app.post('/api/signup', upload.single('avatar'), async (req, res) => {

    // grabs email, password inputs from request to sign up
    const { email, username, password } = req.body;

    try {
        // check if username/email already exists
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

        const avatarUrl = req.file ? `/uploads/${req.file.filename}` : null;

        // insert email, hashed password into user database
        await pool.query('INSERT INTO users (email, username, password_hash, avatar) VALUES ($1, $2, $3, $4)', [email, username, hashedPassword, avatarUrl]);

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

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000,
        });

        res.json({ message: 'Signed in successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});


app.get('/api/conversations', async (req, res) => {
    const token = req.cookies.token;


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const result = await pool.query(
            `
            WITH ranked_messages AS (
                SELECT
                    m.message,
                    m.created_at,
                    m.sender_id,
                    m.recipient_id,
                    u.id AS user_id,
                    u.email AS user_email,
                    u.username AS user_username,
                    u.avatar AS user_avatar,
                    ROW_NUMBER() OVER (
                        PARTITION BY CASE
                            WHEN m.sender_id = $1 THEN m.recipient_id
                            ELSE m.sender_id
                        END
                        ORDER BY m.created_at DESC
                    ) AS rn
                FROM messages m
                JOIN users u ON u.id = CASE
                    WHEN m.sender_id = $1 THEN m.recipient_id
                    ELSE m.sender_id
                END
                WHERE m.sender_id = $1 OR m.recipient_id = $1
            )
            SELECT
                user_id,
                user_email,
                user_username,
                user_avatar AS avatar,
                message,
                created_at
            FROM ranked_messages
            WHERE rn = 1
            ORDER BY created_at DESC;
            `,
            [userId]
        );

        const conversations = result.rows.map((row) => ({
            id: row.user_id,
            email: row.user_email,
            username: row.user_username,
            avatar: row.avatar,
            lastMessage: row.message,
            timestamp: row.created_at,
        }));

        res.json({ conversations });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// FETCH SELECTED CONVERSATIONS
app.get('/api/conversations/:id/messages', async (req, res) => {
    const token = req.cookies.token;


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
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ messages: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const result = await pool.query(`
        SELECT id, username, avatar
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
    const token = req.cookies.token;


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
    const token = req.cookies.token;


    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const result = await pool.query(
            'SELECT id, email, username, avatar FROM users WHERE id = $1',
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
            avatar: user.avatar,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// upload avatar
app.post('/api/user/avatar', upload.single('avatar'), async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const avatarUrl = `/uploads/${req.file.filename}`;
        await pool.query('UPDATE users SET avatar = $1 WHERE id = $2', [avatarUrl, userId]);

        res.json({ message: 'Avatar uploaded successfully', avatar: avatarUrl });
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
    origin: 'http://localhost:3000',
    credentials: true
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

            // Get sender's info
            const senderRes = await pool.query('SELECT username, email, avatar FROM users WHERE id = $1', [senderId]);
            const senderUsername = senderRes.rows[0]?.username || 'Unknown';
            const senderEmail = senderRes.rows[0]?.username || 'Unknown';
            const senderAvatar = senderRes.rows[0]?.avatar || null;

            // get recipient's info
            const recipientRes = await pool.query('SELECT username, email, avatar FROM users WHERE id = $1', [recipientId]);
            const recipientUsername = recipientRes.rows[0]?.username || 'Unknown';
            const recipientEmail = recipientRes.rows[0]?.username || 'Unknown';
            const recipientAvatar = recipientRes.rows[0]?.avatar || null;

            // put message/metadata into container
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

            // check if new conversation
            const convoCheck = await pool.query(
                `SELECT COUNT(*) FROM messages WHERE
                (sender_id = $1 AND recipient_id = $2)
                OR (sender_id = $2 AND recipient_id = $1)`,
                [senderId, recipientId]
            );

            const now = new Date().toISOString();

            // if new, tell sockets to add conversation to conversation list
            const msgCount = parseInt(convoCheck.rows[0].count);
            if (msgCount === 1 && recipientSocketId) {
                io.to(recipientSocketId).emit('newConversation', {
                  id: senderId,
                  email: senderEmail,
                  username: senderUsername,
                  avatar: senderAvatar,
                  lastMessage: content,
                  timestamp: now,
                });
              
                io.to(senderSocketId).emit('newConversation', {
                  id: recipientId,
                  email: recipientEmail,
                  username: recipientUsername,
                  avatar: recipientAvatar,
                  lastMessage: content,
                  timestamp: now,
                });
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


app.post('/api/signout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Signed out' });
});


server.listen(6543, '0.0.0.0', () => {
    console.log('🚀 Server is running on http://0.0.0.0:6543');
});



