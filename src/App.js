import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Sidebar from './components/Sidebar';
import Login from './Login';
import Signup from './Signup';
import APIDocs from './pages/APIDocs';
import About from './pages/About';

function App() {
  const [authTokens, setAuthTokens] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showSignup, setShowSignup] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const decodedToken = authTokens ? jwtDecode(authTokens) : null;

  // Function to fetch users data
  const fetchUsersData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    return authTokens ? children : <Navigate to="/login" />;
  };

  // Login page with navigation on successful login
  const LoginPage = () => {
    const navigate = useNavigate();

    const handleSetAuthTokens = (tokens) => {
      setAuthTokens(tokens);
      navigate('/'); // Redirect to the protected route
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        {!showSignup ? (
          <div>
            <Login setAuthTokens={handleSetAuthTokens} />
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
    );
  };

  return (
    <Router>
      <div className="flex">
        {authTokens && <Sidebar />}
        <main className={authTokens ? 'ml-72 w-full' : 'w-full'}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="max-w-lg w-full p-6 bg-secondary rounded-lg shadow space-y-6">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-accent">
                        Welcome, {decodedToken?.email}
                      </h1>
                      <button
                        onClick={() => setAuthTokens(null)}
                        className="text-textColor bg-primary hover:bg-primary-dark px-4 py-2 rounded"
                      >
                        Log Out
                      </button>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => {
                          if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                            const message = 'Client message at ' + new Date().toLocaleTimeString();
                            socketRef.current.send(message);
                            setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
                          } else {
                            console.error('WebSocket is not open');
                          }
                        }}
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

                    <div className="space-y-4">
                      <button
                        onClick={fetchUsersData}
                        className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent-dark"
                      >
                        Fetch Users Data
                      </button>
                      {loading && <p className="text-center text-textColor">Loading...</p>}
                      {error && <p className="text-center text-red-600">{error}</p>}
                      {usersData && (
                        <div>
                          <h2 className="text-xl font-semibold text-accent">Users Data:</h2>
                          <pre className="mt-2 p-4 bg-white rounded shadow overflow-x-auto">
                            {JSON.stringify(usersData, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="/api-docs" element={<ProtectedRoute><APIDocs /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
