'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        // make sure passwords match
        if (password != confirmPassword) {
            alert('Passwords do no match!');
            return;
        }

        const res = await fetch('http://localhost:6543/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert('Sign up successful!');
            router.push('/login');
        } else {
            alert(data.message || 'Sign up failed');
        }

    };

    const handleGoHome = () => {
        router.push('/');
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left side: Signup form */}
            <main className="w-full md:w-2/7 flex flex-col items-center justify-center p-8 bg-[#f1e9e6] text-black">
                <h1 className="font-zain text-5xl font-bold mb-6">Sign Up</h1>
                <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-2 border rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full font-zain text-3xl px-6 py-2 bg-[#ebe1c7] text-black rounded hover:bg-[#23262a] hover:text-[#f1e9e6] border-2"
                    >
                        Submit
                    </button>
                </form>

            </main>

            {/* Right side: Image + Text */}
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
        </div>
    );

    // return (
    //     <main className="min-h-screen flex flex-col items-center justify-center p-8">
    //         <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
    //         <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4">
    //             <input
    //                 type="email"
    //                 placeholder="Email"
    //                 className="w-full p-2 border rounded"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 required
    //             />
    //             <input
    //                 type="text"
    //                 placeholder="Username"
    //                 className="w-full p-2 border rounded"
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //                 required
    //             />
    //             <input
    //                 type="password"
    //                 placeholder="Password"
    //                 className="w-full p-2 border rounded"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 required
    //             />
    //             <input
    //                 type="password"
    //                 placeholder="Confirm Password"
    //                 className="w-full p-2 border rounded"
    //                 value={confirmPassword}
    //                 onChange={(e) => setConfirmPassword(e.target.value)}
    //                 required
    //             />
    //             <button
    //                 type="submit"
    //                 className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
    //             >
    //                 Sign Up
    //             </button>
    //         </form>

    //         <button
    //             onClick={handleGoHome}
    //             className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
    //         >
    //             Back to Home
    //         </button>

    //     </main>
    // );

}