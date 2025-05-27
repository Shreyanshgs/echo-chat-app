'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { Plus, LogOut, Settings } from 'lucide-react';
import MessageBubble from './MessageBubble';


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
    avatar: string;
    lastMessage?: string;
    timestamp: string;
}

function ChatItem({ username, avatar, timestamp, lastMessage }: Conversation) {
    return (
        <div className="flex items-center justify-between px-4 py-4 hover:bg-gray-100 transition cursor-pointer">
            <div className="flex items-center space-x-3">
                <img
                    src={avatar ? `http://localhost:6543${avatar}` : '/echologo.png'}
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/echologo.png';
                    }}
                />
                <div className="ml-4">
                    <p className="text-xl font-semibold text-black">{username}</p>
                    <p className="text-sm text-gray-600 truncate w-70">{lastMessage}</p>
                </div>
            </div>
            <div className="text-s text-gray-400 text-right min-w-[50px]">
                <p>{new Date(timestamp).toLocaleString('en-US', {
                    timeZone: 'America/Los_Angeles',
                    month: 'short',
                    day: 'numeric',
                })}</p>
            </div>
        </div>
    );
}

function NewChatItem({ username, avatar }: Conversation) {
    return (
        <div className="flex items-center justify-between px-4 py-1 transition cursor-pointer">
            <div className="flex items-center space-x-3">
                <img
                    src={avatar ? `http://localhost:6543${avatar}` : '/echologo.png'}
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/echologo.png';
                    }}
                />
                <div className="text-xl ml-2">
                    <p className="font-semibold text-black">{username}</p>
                </div>
            </div>
        </div>
    );
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
    const handleLogout = async () => {
        await fetch('http://localhost:6543/api/signout', {
            method: 'POST',
            credentials: 'include',
        });
        router.push('/login');
    };

    // connect socket
    useEffect(() => {
        socketRef.current = io('http://localhost:6543');

        const handleNewConversation = async (newConvo: Conversation) => {
            setConversations((prev) => {
                const exists = prev.some((c) => c.id === newConvo.id);
                if (exists) return prev;
                return [newConvo, ...prev];
            });
            await fetchUsers();
        };

        socketRef.current.on('newConversation', handleNewConversation);

        return () => {
            socketRef.current?.off('newConversation', handleNewConversation);
            socketRef.current?.disconnect();
        };

    }, []);

    useEffect(() => {
        if (!socketRef.current) return;
        const handleReceiveMessage = (message: Message) => {
            // 1. Append to message view if current conversation is open
            if (
                selectedConversation &&
                (message.senderId === selectedConversation.id || message.senderId === currentUserId)
            ) {
                setMessages((prev) => [...prev, message]);
            }

            // 2. Update conversations list (last message + timestamp + reorder)
            setConversations((prev) => {
                const otherId = message.senderId === currentUserId ? selectedConversation?.id : message.senderId;

                const updated = prev.map((conv) =>
                    conv.id === otherId
                        ? { ...conv, lastMessage: message.content, timestamp: message.timestamp }
                        : conv
                );

                const sorted = [...updated].sort(
                    (a, b) => new Date(b.timestamp ?? 0).getTime() - new Date(a.timestamp ?? 0).getTime()
                );

                return sorted;
            });
        };

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


        const fetchMe = async () => {
            const res = await fetch('http://localhost:6543/api/me', {
                credentials: 'include'
            });
            if (!res.ok) {
                console.error('Failed to fetch users:', res.status);
                return;
            }
            const data = await res.json();
            setCurrentUserEmail(data.email);
            setCurrentUserId(data.id);
            setCurrentUsername(data.username);
            socketRef.current?.emit('register', data.id);
        };

        fetchMe();
    }, []);

    const fetchUsers = async () => {
        const res = await fetch('http://localhost:6543/api/users', {
            credentials: 'include'
        });
        if (!res.ok) {
            console.error('Failed to fetch users:', res.status);
            return;
        }
        const data = await res.json();
        const formatted = data.users.map((user: any) => ({
            username: user.username,
            id: user.id,
            avatar: user.avatar || '',
        }));

        setAllUsers(formatted);
    };

    // fetch possible new users to talk to
    useEffect(() => {
        // fetch users only once on mount

        fetchUsers();

    }, []);

    // fetch conversations when the page loads
    useEffect(() => {


        const fetchConversations = async () => {
            const res = await fetch('http://localhost:6543/api/conversations', {
                credentials: 'include'

            });
            if (!res.ok) {
                console.error('Failed to fetch users:', res.status);
                return;
            }
            const data = await res.json();

            const formatted = data.conversations.map((conv: any) => ({
                username: conv.username,
                email: conv.email,
                id: conv.id,
                avatar: conv.avatar,
                lastMessage: conv.lastMessage,
                timestamp: conv.timestamp,
            }));
            setConversations(formatted);
        };

        fetchConversations(); // initial load

    }, []);

    // fetch messages when a conversation is selected
    useEffect(() => {
        if (!selectedConversation) return;

        const fetchMessages = async () => {
            const res = await fetch(`http://localhost:6543/api/conversations/${selectedConversation.id}/messages`, {
                credentials: 'include'
            });
            if (!res.ok) {
                console.error('Failed to fetch users:', res.status);
                return;
            }
            const data = await res.json();
            setMessages(data.messages);
        };

        fetchMessages();
    }, [selectedConversation]);

    // handle when user sends a new message in current conversation
    const handleSendMessage = async () => {
        if (newMessage.trim() && selectedConversation) {
            const messageData = {
                senderId: currentUserId,
                recipientId: selectedConversation.id,
                content: newMessage,
            };

            socketRef.current?.emit('send_message', messageData);

            const now = new Date().toISOString();

            // update conversation list optimistically
            setConversations((prev) => {
                const updated = prev.map((conv) =>
                    conv.id === selectedConversation.id
                        ? { ...conv, lastMessage: newMessage, timestamp: now }
                        : conv
                );

                return updated.sort(
                    (a, b) => new Date(b.timestamp ?? 0).getTime() - new Date(a.timestamp ?? 0).getTime()
                );
            });

            setNewMessage('');
        }
    };

    return (
        <div className="flex h-screen bg-[#23262a] text-[#23262a]">
            <div className="ml-3 my-2 w-full max-w-1/4 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-2xl font-bold">Chats (as {currentUsername})</h2>
                    <div className="flex items-center space-x-2">
                        <div className="">
                            <button
                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                onClick={() => setShowUserList(!showUserList)}
                                aria-label="New Conversation"
                            >
                                <Plus size={18} />
                            </button>

                            {showUserList && (
                                <ul className="absolute left-0 right-0 top-12 z-50 max-h-60 w-full overflow-y-auto border-5 border-green-600 rounded bg-white shadow-lg">
                                    {allUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            onClick={() => {
                                                setSelectedConversation(user);
                                                setShowUserList(false);
                                            }}
                                            className="cursor-pointer text-black hover:bg-green-300 p-2 rounded"
                                        >
                                            <NewChatItem {...user} />
                                        </div>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button
                            className="bg-blue-500 text-white p-2 rounded hover:bg-gray-300"
                            onClick={() => console.log('Settings clicked')}
                            aria-label="Settings"
                        >
                            <Settings size={18} />
                        </button>
                        <button
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            onClick={handleLogout}
                            aria-label="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                <div>
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => setSelectedConversation(conv)}
                            className="hover:bg-gray-100 cursor-pointer"
                        >
                            <ChatItem {...conv} />
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mx-2 my-2 flex-1 p-4 bg-[#74bfd7] rounded-xl flex flex-col">
                {selectedConversation ? (
                    <>
                        <div className="flex items-center justify-between border-b pb-3 mb-4 px-4">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={selectedConversation.avatar ? `http://localhost:6543${selectedConversation.avatar}` : '/echologo.png'}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-lg">{selectedConversation.username}</p>
                                </div>
                            </div>
                            <div className="flex space-x-4 text-gray-500">
                                <button title="Call">Call<i className="fas fa-phone" /></button>
                                <button title="Video">Video<i className="fas fa-video" /></button>
                                <button title="Info">Info<i className="fas fa-info-circle" /></button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 border-b pb-4">

                            {messages.map((message, index) => (
                                <MessageBubble
                                    key={index}
                                    content={message.content}
                                    timestamp={message.timestamp}
                                    senderId={message.senderId}
                                    senderUsername={message.senderUsername}
                                    currentUserId={currentUserId}
                                    image={selectedConversation.avatar ? `http://localhost:6543${selectedConversation.avatar}` : '/echologo.png'}
                                    prevMessageTime={
                                        index > 0 ? messages[index - 1].timestamp : null
                                    }
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="flex items-center px-4 py-2 bg-white rounded-full shadow mt-4 w-full">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 rounded-full focus:outline-none text-sm text-black"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
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
