import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative h-screen text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      >
        <source src="/backgroundvid.mp4" type="video/mp4" />
      </video>

      {/* Content Over Video */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Connect Instantly with Your Loved Ones</h1>
        <p className="text-2xl mb-7 max-w-xl">
          Experience seamless communication with our intuitive messaging app.
          Share moments and chat effortlessly.
        </p>
        <div className="space-x-4">
          <Link href="/signup">
            <button className="font-zain text-4xl px-6 py-2 bg-[#ebe1c7] text-black rounded hover:bg-[#23262a] hover:text-[#f1e9e6]">
              Get Started
            </button>
          </Link>
          <Link href="/login">
            <button className="font-zain text-4xl px-6 py-2 bg-[#ebe1c7] text-black rounded hover:bg-[#23262a] hover:text-[#f1e9e6]">
              Learn More
            </button>
          </Link>
        </div>
      </div>
      {/* <section className="bg-[#fef9f4] text-[#4b3621] py-50 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Real-Time Messaging</h3>
            <p>Send and receive messages instantly using Socket.IO.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
            <p>Login with encrypted credentials using JWT.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
            <p>Simple, elegant design built with Tailwind CSS.</p>
          </div>
        </div>
      </section> */}
    </main>
  );
}




// return (
//   <main className = "min-h-screen flex flex-col items-center justify-center p-8">
//     <h1 className = "text-4xl font-bold mb-4">Welcome to Echo</h1>
//     <p className = "mb-6">Login or sign up to start messaging</p>
//     <div className = "space-x-4">
//       <Link href="/login">
//         <button className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
//       </Link>
//       <Link href = "/signup">
//         <button className = "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sign Up</button>
//       </Link>
//     </div>
//   </main>
// );
