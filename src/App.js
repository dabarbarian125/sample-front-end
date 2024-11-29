// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import Signup from './Signup';
import Login from './Login';
import {jwtDecode} from 'jwt-decode';

function App() {
  const [authTokens, setAuthTokens] = useState(null);
  const [messages, setMessages] = useState([]); // State to hold received messages

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
        setMessages((prevMessages) => [...prevMessages, event.data]); // Update messages state
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
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]); // Optional: Add sent message to messages state
    } else {
      console.error('WebSocket is not open');
    }
  };

  const handleLogout = () => {
    setAuthTokens(null);
    console.log('User logged out');
  };

  const decodedToken = authTokens ? jwtDecode(authTokens) : null;
  console.log('Decoded token:', decodedToken);

  return (
    <div>
      {!authTokens ? (
        <>
          <h2>Sign Up</h2>
          <Signup />
          <h2>Log In</h2>
          <Login setAuthTokens={setAuthTokens} />
        </>
      ) : (
        <div>
          <h1>Welcome, {decodedToken.email}</h1>
          <button onClick={handleLogout}>Log Out</button>
          <h2>WebSocket Test</h2>
          <button onClick={sendMessage}>Send Message to Server</button>

          <h3>Messages:</h3>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
