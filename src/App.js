// app.js
import React, { useEffect, useRef } from 'react';
// import { useAuth } from "react-oidc-context";

function SplashPage() {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3001');

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
      socketRef.current.send('Hello from the client!');
    };

    socketRef.current.onmessage = (event) => {
      console.log(`Received from server: ${event.data}`);
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send('Client message at ' + new Date().toLocaleTimeString());
    } else {
      console.error('WebSocket is not open');
    }
  };

  return (
    <div>
      <h1>WebSocket Test</h1>
      <button onClick={sendMessage}>Send Message to Server</button>
    </div>
  );
}
export default SplashPage;