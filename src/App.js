import React from 'react';

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen flex items-center justify-center">
      <header className="App-header text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to my App</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
          Click me
        </button>
      </header>
    </div>
  );
}

export default App;
