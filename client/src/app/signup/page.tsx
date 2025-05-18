'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [avatarFile, setAvatarFile] = useState<File | null>(null);;
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (!avatarFile) {
            alert('Please upload a profile picture.');
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('avatar', avatarFile);

        const res = await fetch('http://localhost:6543/api/signup', {
            method: 'POST',
            body: formData, 
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
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                    />
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

}