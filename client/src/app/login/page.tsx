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
        <div className="flex flex-col md:flex-row min-h-screen">
            <div
                className="w-full md:w-5/7 bg-cover bg-center relative"
            >
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/backgroundvid.mp4" // 🟡 Put your video in /public
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>
            <main className="min-h-screen md:w-2/7 flex flex-col items-center justify-center p-8 bg-[#f1e9e6] text-black">
                <div className="bg-[#f1e9e6] px-4 py-4 rounded ">
                    <h1 className="font-zain text-5xl font-bold text-center mb-6">Login</h1>
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
                            className="w-full font-zain text-3xl px-6 py-2 bg-[#ebe1c7] text-black rounded hover:bg-[#23262a] hover:text-[#f1e9e6] border-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}