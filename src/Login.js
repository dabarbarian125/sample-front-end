// src/Login.js

import React, { useState } from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userPool from './UserPool';

function Login({ setAuthTokens }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Login form submitted:', { email, password }); // Debug log

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    console.log('CognitoUser:', user); // Debug log

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    console.log('AuthenticationDetails:', authDetails); // Debug log

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('Login success:', data); // Debug log
        setAuthTokens(data.getIdToken().getJwtToken());
      },
      onFailure: (err) => {
        console.error('Login error:', err); // Debug log
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        type="email" 
        required 
      />
      <input 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        type="password" 
        required 
      />
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
