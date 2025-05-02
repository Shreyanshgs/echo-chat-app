import Link from 'next/link'

export default function Home() {
  return (
    <main className = "min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className = "text-4xl font-bold mb-4">Welcome to Echo</h1>
      <p className = "mb-6">Login or sign up to start messaging</p>
      <div className = "space-x-4">
        <Link href="/login">
          <button className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
        </Link>
        <Link href = "/signup">
          <button className = "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sign Up</button>
        </Link>
      </div>
    </main>
  );
}
