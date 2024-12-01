// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import Signup from './Signup';
import Login from './Login';
import {jwtDecode} from 'jwt-decode';

function App() {
  const [authTokens, setAuthTokens] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showSignup, setShowSignup] = useState(false);
  const [usersData, setUsersData] = useState(null); // State to store fetched users data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

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

  // Function to fetch users data from the API
  const fetchUsersData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include the auth token if required by the API
          Authorization: `Bearer ${authTokens}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsersData(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'An error occurred while fetching users data.');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="max-w-lg w-full p-6 bg-secondary rounded-lg shadow space-y-6">
          <div className="flex items-center justify-between">
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

          {/* Existing WebSocket interaction */}
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

          {/* New section for fetching and displaying users data */}
          <div className="space-y-4">
            <button
              onClick={fetchUsersData}
              className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent-dark"
            >
              Fetch Users Data
            </button>

            {loading && (
              <p className="text-center text-textColor">Loading...</p>
            )}

            {error && (
              <p className="text-center text-red-600">{error}</p>
            )}

            {usersData && (
              <div>
                <h2 className="text-xl font-semibold text-accent">
                  Users Data:
                </h2>
                <pre className="mt-2 p-4 bg-white rounded shadow overflow-x-auto">
                  {JSON.stringify(usersData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
