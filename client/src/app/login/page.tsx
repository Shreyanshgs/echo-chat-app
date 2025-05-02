'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        // prevent page reload when submitting
        e.preventDefault();

        // send POST request to signin route
        const res = await fetch('http://localhost:6543/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        // receieve server response and parses as JSON
        const data = await res.json();

        // make sure login is successful, otherwise return login failed
        if (res.ok) {
            // store returned token for future authentications, and redirect to messages page
            localStorage.setItem('token', data.token);
            router.push('/messages');
        } else {
            alert(data.message || 'Login failed');
        };
    };

    const handleGoHome = () => {
        router.push('/');  
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Log In
                </button>
            </form>
            <button
                onClick = { handleGoHome }
                className = "mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
            Back to Home
            </button>
        </main>
    );
}