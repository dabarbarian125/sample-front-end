import React from 'react';

function SplashPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between">
        <h1 className="text-4xl font-bold text-blue-800">My Awesome App</h1>
        <nav>
          <a href="#" className="text-blue-700 hover:text-blue-900 mx-4 text-lg">Home</a>
          <a href="#" className="text-blue-700 hover:text-blue-900 mx-4 text-lg">About</a>
          <a href="#" className="text-blue-700 hover:text-blue-900 mx-4 text-lg">Contact</a>
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <h2 className="text-6xl font-extrabold text-center text-blue-800 drop-shadow-lg">
          Welcome to My Awesome App
        </h2>
        <p className="text-2xl text-center text-blue-700 mt-4 max-w-2xl">
          This is where your next adventure begins. Experience the power of technology with a simple and elegant interface.
        </p>
        <button className="mt-10 px-10 py-5 bg-blue-700 text-white font-semibold text-xl rounded-lg shadow-md hover:bg-blue-800 transition-all">
          Get Started
        </button>
      </main>

      <footer className="w-full p-6 text-center text-blue-700 font-medium text-lg">
        &copy; {new Date().getFullYear()} My Awesome App. All rights reserved.
      </footer>
    </div>
  );
}

export default SplashPage;