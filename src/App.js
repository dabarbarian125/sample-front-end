// src/App.js

import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import {jwtDecode} from 'jwt-decode';

function App() {
  const [authTokens, setAuthTokens] = useState(null);

  const handleLogout = () => {
    setAuthTokens(null);
    console.log('User logged out'); // Debug log
  };

  const decodedToken = authTokens ? jwtDecode(authTokens) : null;
  console.log('Decoded token:', decodedToken); // Debug log

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
        </div>
      )}
    </div>
  );
}

export default App;
