'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';


interface Message {
    senderId: string;
    senderUsername: string,
    content: string;
    timestamp: string;
}

interface Conversation {
    id: string;
    email: string;
    username?: string;
}

export default function MessagesPage() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [allUsers, setAllUsers] = useState<Conversation[]>([]);
    const [showUserList, setShowUserList] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [currentUsername, setCurrentUsername] = useState('');
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const prevMessageCountRef = useRef<number>(0);
    const socketRef = useRef<Socket | null>(null);

    // connect socket
    useEffect(() => {
        socketRef.current = io('http://localhost:6543');
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socketRef.current) return;
        const handleReceiveMessage = (message: Message) => {
            if (
                selectedConversation &&
                (message.senderId === selectedConversation.id || message.senderId === currentUserId)
              ) {
                setMessages((prev) => [...prev, message]);
              }
        }

        socketRef.current.on('receive_message', handleReceiveMessage);

        return () => {
            socketRef.current?.off('receive_message', handleReceiveMessage);
        };
    }, [selectedConversation]);

    // autoscroll to most recent message
    useEffect(() => {
        if (messages.length > prevMessageCountRef.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        prevMessageCountRef.current = messages.length;
    }, [messages]);

    // labeling messages
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const fetchMe = async () => {
            const res = await fetch('http://localhost:6543/api/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setCurrentUserEmail(data.email);
            setCurrentUserId(data.id);
            setCurrentUsername(data.username);
            socketRef.current?.emit('register', data.id);
        };

        fetchMe();
    }, []);

    // fetch possible new users to talk to
    useEffect(() => {
        // fetch users only once on mount
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchUsers = async () => {
            const res = await fetch('http://localhost:6543/api/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setAllUsers(data.users);
        };

        fetchUsers();

        // const interval = setInterval(fetchUsers, 10000);
        // return () => clearInterval(interval);

    }, []);

    // fetch conversations when the page loads
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchConversations = async () => {
            const res = await fetch('http://localhost:6543/api/conversations', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setConversations(data.conversations);
        };

        fetchConversations(); // initial load
        // const interval = setInterval(fetchConversations, 2000); // update every 2 seconds

        // return () => clearInterval(interval);
    }, []);

    // fetch messages when a conversation is selected
    useEffect(() => {
        if (!selectedConversation) return;

        const fetchMessages = async () => {
            const res = await fetch(`http://localhost:6543/api/conversations/${selectedConversation.id}/messages`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await res.json();
            setMessages(data.messages);
        };

        fetchMessages(); // fetch immediately when conversation is selected

        // const interval = setInterval(fetchMessages, 2000);

        // return () => clearInterval(interval);
    }, [selectedConversation]);

    // handle when user sends a new message in current conversation
    const handleSendMessage = async () => {
        if (newMessage.trim() && selectedConversation) {
            // const res = await fetch(`http://localhost:6543/api/conversations/${selectedConversation?.id}/messages`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
            //     },
            //     body: JSON.stringify({ content: newMessage }),
            // });

            socketRef.current?.emit('send_message', {
                senderId: currentUserId,
                recipientId: selectedConversation.id,
                content: newMessage,
            });

            setNewMessage('');
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 p-4 border-r">
                <button
                    className="mb-4 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    onClick={() => setShowUserList(!showUserList)}
                >
                    New Message
                </button>

                {showUserList && (
                    <ul className="mb-4 max-h-40 overflow-y-auto border rounded p-2 bg-black">
                        {allUsers.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => {
                                    setSelectedConversation(user);
                                    setShowUserList(false);
                                }}
                                className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                            >
                                {user.username ?? user.email}
                            </li>
                        ))}
                    </ul>
                )}
                <h2 className="text-2xl font-semibold mb-4">Conversations</h2>
                <ul className="mb-4 max-h-40 overflow-y-auto border rounded p-2 bg-black">
                    {conversations.map((conversation) => (
                        <li
                            key={conversation.id}
                            onClick={() => setSelectedConversation(conversation)}
                            className="cursor-pointer hover:bg-gray-200 p-2 rounded mb-2"
                        >
                            {conversation.username ?? conversation.email ?? 'Unnamed'}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 p-4">
                {selectedConversation ? (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">{selectedConversation.username ?? selectedConversation.email}</h2>
                        <div className="space-y-4 h-[60vh] overflow-y-scroll border-b pb-4">
                            {messages.map((message, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className="font-semibold text-gray-600">
                                        {message.senderId === currentUserId ? 'You' : message.senderUsername}
                                    </div>
                                    <div>{message.content}</div>
                                    <div className="text-sm text-gray-400">{new Date(message.timestamp).toLocaleString('en-US', {
                                        timeZone: 'America/Los_Angeles',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })}</div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="mt-4">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Type a message..."
                            />
                            <button
                                onClick={handleSendMessage}
                                className="w-full bg-blue-500 text-white py-2 mt-2 rounded hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">Select a conversation to view messages</div>
                )}
            </div>
        </div>
    );
}
