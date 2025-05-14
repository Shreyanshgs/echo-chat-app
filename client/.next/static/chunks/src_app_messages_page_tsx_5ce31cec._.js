(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/messages/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MessagesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function MessagesPage() {
    _s();
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedConversation, setSelectedConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [allUsers, setAllUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showUserList, setShowUserList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentUserEmail, setCurrentUserEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentUserId, setCurrentUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentUsername, setCurrentUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const prevMessageCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        router.push('/login');
    };
    // connect socket
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            socketRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])('http://localhost:6543');
            const handleNewConversation = {
                "MessagesPage.useEffect.handleNewConversation": (newConvo)=>{
                    setConversations({
                        "MessagesPage.useEffect.handleNewConversation": (prev)=>{
                            const exists = prev.some({
                                "MessagesPage.useEffect.handleNewConversation.exists": (c)=>c.id === newConvo.id
                            }["MessagesPage.useEffect.handleNewConversation.exists"]);
                            if (exists) return prev;
                            return [
                                newConvo,
                                ...prev
                            ];
                        }
                    }["MessagesPage.useEffect.handleNewConversation"]);
                }
            }["MessagesPage.useEffect.handleNewConversation"];
            socketRef.current.on('newConversation', handleNewConversation);
            return ({
                "MessagesPage.useEffect": ()=>{
                    socketRef.current?.off('newConversation', handleNewConversation);
                    socketRef.current?.disconnect();
                }
            })["MessagesPage.useEffect"];
        }
    }["MessagesPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            if (!socketRef.current) return;
            const handleReceiveMessage = {
                "MessagesPage.useEffect.handleReceiveMessage": (message)=>{
                    if (selectedConversation && (message.senderId === selectedConversation.id || message.senderId === currentUserId)) {
                        setMessages({
                            "MessagesPage.useEffect.handleReceiveMessage": (prev)=>[
                                    ...prev,
                                    message
                                ]
                        }["MessagesPage.useEffect.handleReceiveMessage"]);
                    }
                }
            }["MessagesPage.useEffect.handleReceiveMessage"];
            socketRef.current.on('receive_message', handleReceiveMessage);
            return ({
                "MessagesPage.useEffect": ()=>{
                    socketRef.current?.off('receive_message', handleReceiveMessage);
                }
            })["MessagesPage.useEffect"];
        }
    }["MessagesPage.useEffect"], [
        selectedConversation
    ]);
    // autoscroll to most recent message
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            if (messages.length > prevMessageCountRef.current) {
                messagesEndRef.current?.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            prevMessageCountRef.current = messages.length;
        }
    }["MessagesPage.useEffect"], [
        messages
    ]);
    // labeling messages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            const token = localStorage.getItem('token');
            if (!token) return;
            const fetchMe = {
                "MessagesPage.useEffect.fetchMe": async ()=>{
                    const res = await fetch('http://localhost:6543/api/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await res.json();
                    setCurrentUserEmail(data.email);
                    setCurrentUserId(data.id);
                    setCurrentUsername(data.username);
                    socketRef.current?.emit('register', data.id);
                }
            }["MessagesPage.useEffect.fetchMe"];
            fetchMe();
        }
    }["MessagesPage.useEffect"], []);
    // fetch possible new users to talk to
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            // fetch users only once on mount
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }
            const fetchUsers = {
                "MessagesPage.useEffect.fetchUsers": async ()=>{
                    const res = await fetch('http://localhost:6543/api/users', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await res.json();
                    setAllUsers(data.users);
                }
            }["MessagesPage.useEffect.fetchUsers"];
            fetchUsers();
        // const interval = setInterval(fetchUsers, 10000);
        // return () => clearInterval(interval);
        }
    }["MessagesPage.useEffect"], []);
    // fetch conversations when the page loads
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }
            const fetchConversations = {
                "MessagesPage.useEffect.fetchConversations": async ()=>{
                    const res = await fetch('http://localhost:6543/api/conversations', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = await res.json();
                    setConversations(data.conversations);
                }
            }["MessagesPage.useEffect.fetchConversations"];
            fetchConversations(); // initial load
        // const interval = setInterval(fetchConversations, 2000); // update every 2 seconds
        // return () => clearInterval(interval);
        }
    }["MessagesPage.useEffect"], []);
    // fetch messages when a conversation is selected
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessagesPage.useEffect": ()=>{
            if (!selectedConversation) return;
            const fetchMessages = {
                "MessagesPage.useEffect.fetchMessages": async ()=>{
                    const res = await fetch(`http://localhost:6543/api/conversations/${selectedConversation.id}/messages`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await res.json();
                    setMessages(data.messages);
                }
            }["MessagesPage.useEffect.fetchMessages"];
            fetchMessages(); // fetch immediately when conversation is selected
        // const interval = setInterval(fetchMessages, 2000);
        // return () => clearInterval(interval);
        }
    }["MessagesPage.useEffect"], [
        selectedConversation
    ]);
    // handle when user sends a new message in current conversation
    const handleSendMessage = async ()=>{
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
                content: newMessage
            });
            setNewMessage('');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen bg-[#f1e9e6] text-[#23262a]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-1/4 p-4 border-r",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center space-x-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-green-500 text-white border-2 border-green-600 py-1 px-3 rounded hover:bg-green-600",
                                        onClick: ()=>setShowUserList(!showUserList),
                                        children: "New Conversation"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/messages/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-red-500 border-2 border-red-600 text-white py-1 px-3 rounded hover:bg-red-600",
                                        onClick: handleLogout,
                                        children: "Logout"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/messages/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/messages/page.tsx",
                                lineNumber: 208,
                                columnNumber: 21
                            }, this),
                            showUserList && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "max-h-40 overflow-y-auto border-2 border-green-600 rounded p-2 mb-3 bg-[#f1e9e6] w-100",
                                children: allUsers.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        onClick: ()=>{
                                            setSelectedConversation(user);
                                            setShowUserList(false);
                                        },
                                        className: "cursor-pointer text-black hover:bg-green-300 p-2 rounded",
                                        children: user.username ?? user.email
                                    }, user.id, false, {
                                        fileName: "[project]/src/app/messages/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/messages/page.tsx",
                                lineNumber: 225,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/messages/page.tsx",
                        lineNumber: 207,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-4xl font-semibold mb-4 justify-center",
                            children: "Conversations"
                        }, void 0, false, {
                            fileName: "[project]/src/app/messages/page.tsx",
                            lineNumber: 243,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/messages/page.tsx",
                        lineNumber: 242,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "text-2xl mb-4 h-180 overflow-y-auto border rounded p-2 bg-[#f1e9e6]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center",
                            children: conversations.map((conversation)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    onClick: ()=>setSelectedConversation(conversation),
                                    className: "cursor-pointer hover:bg-gray-400 p-2 rounded justify-center",
                                    children: conversation.username ?? conversation.email ?? 'Unnamed'
                                }, conversation.id, false, {
                                    fileName: "[project]/src/app/messages/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 25
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/messages/page.tsx",
                            lineNumber: 246,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/messages/page.tsx",
                        lineNumber: 245,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/messages/page.tsx",
                lineNumber: 206,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 p-4",
                children: selectedConversation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-semibold mb-4",
                            children: selectedConversation.username ?? selectedConversation.email
                        }, void 0, false, {
                            fileName: "[project]/src/app/messages/page.tsx",
                            lineNumber: 264,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 h-[60vh] overflow-y-scroll border-b pb-4",
                            children: [
                                messages.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-gray-600",
                                                children: message.senderId === currentUserId ? 'You' : message.senderUsername
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/page.tsx",
                                                lineNumber: 268,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: message.content
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-400",
                                                children: new Date(message.timestamp).toLocaleString('en-US', {
                                                    timeZone: 'America/Los_Angeles',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/page.tsx",
                                                lineNumber: 272,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/app/messages/page.tsx",
                                        lineNumber: 267,
                                        columnNumber: 33
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: messagesEndRef
                                }, void 0, false, {
                                    fileName: "[project]/src/app/messages/page.tsx",
                                    lineNumber: 280,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/messages/page.tsx",
                            lineNumber: 265,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: newMessage,
                                    onChange: (e)=>setNewMessage(e.target.value),
                                    className: "w-full p-2 border rounded",
                                    placeholder: "Type a message..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/messages/page.tsx",
                                    lineNumber: 283,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSendMessage,
                                    className: "w-full bg-blue-500 text-white py-2 mt-2 rounded hover:bg-blue-600",
                                    children: "Send"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/messages/page.tsx",
                                    lineNumber: 290,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/messages/page.tsx",
                            lineNumber: 282,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: "Select a conversation to view messages"
                }, void 0, false, {
                    fileName: "[project]/src/app/messages/page.tsx",
                    lineNumber: 299,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/messages/page.tsx",
                lineNumber: 261,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/messages/page.tsx",
        lineNumber: 205,
        columnNumber: 9
    }, this);
}
_s(MessagesPage, "Ckb8LErCIc71LdsCQN1ISGPUJOw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = MessagesPage;
var _c;
__turbopack_context__.k.register(_c, "MessagesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_messages_page_tsx_5ce31cec._.js.map