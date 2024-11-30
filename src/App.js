// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import Signup from './Signup';
import Login from './Login';
import {jwtDecode} from 'jwt-decode';

function App() {
  const [authTokens, setAuthTokens] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showSignup, setShowSignup] = useState(false); // State to toggle between login and signup

  const socketRef = useRef(null);

  useEffect(() => {
    if (authTokens) {
      socketRef.current = new WebSocket('ws://localhost:3001');

      socketRef.current.onopen = () => {
        console.log('WebSocket connected');
        socketRef.current.send('Hello from the client!');
      };

      socketRef.current.onmessage = (event) => {
        console.log(`Received from server: ${event.data}`);
        setMessages((prevMessages) => [...prevMessages, event.data]);
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socketRef.current.onclose = () => {
        console.log('WebSocket connection closed');
      };

      // Clean up on unmount or when authTokens changes
      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
      };
    }
  }, [authTokens]);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = 'Client message at ' + new Date().toLocaleTimeString();
      socketRef.current.send(message);
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
    } else {
      console.error('WebSocket is not open');
    }
  };

  const handleLogout = () => {
    setAuthTokens(null);
    console.log('User logged out');
  };

  const decodedToken = authTokens ? jwtDecode(authTokens) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {!authTokens ? (
        <div className="space-y-8">
          {!showSignup ? (
            <div>
              <Login setAuthTokens={setAuthTokens} />
              <p className="mt-4 text-center text-textColor">
                Don't have an account?{' '}
                <button
                  onClick={() => setShowSignup(true)}
                  className="text-accent hover:underline"
                >
                  Sign up!
                </button>
              </p>
            </div>
          ) : (
            <div>
              <Signup />
              <p className="mt-4 text-center text-textColor">
                Already have an account?{' '}
                <button
                  onClick={() => setShowSignup(false)}
                  className="text-accent hover:underline"
                >
                  Log in!
                </button>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-lg w-full p-6 bg-secondary rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-accent">
              Welcome, {decodedToken.email}
            </h1>
            <button
              onClick={handleLogout}
              className="text-textColor bg-primary hover:bg-primary-dark px-4 py-2 rounded"
            >
              Log Out
            </button>
          </div>
          <div className="space-y-4">
            <button
              onClick={sendMessage}
              className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent-dark"
            >
              Send Message to Server
            </button>
            <div>
              <h2 className="text-xl font-semibold text-accent">Messages:</h2>
              <ul className="mt-2 space-y-2">
                {messages.map((msg, index) => (
                  <li key={index} className="p-2 bg-white rounded shadow">
                    {msg}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
