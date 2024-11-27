// src/Signup.js

import React, { useState } from 'react';
import userPool from './UserPool';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    // Attributes for the user in Cognito
    const attributes = [
      { Name: 'email', Value: email }, // Cognito uses "email" as the attribute name
    ];

    console.log('Signup form submitted:', { email, password }); // Debug log

    userPool.signUp(email, password, attributes, null, (err, data) => {
      if (err) {
        console.error('Sign up error:', err); // Debug log
        setError(err.message || 'An error occurred during signup.');
        setSuccess(false);
      } else {
        console.log('Sign up success:', data); // Debug log
        setError('');
        setSuccess(true);
      }
    });
  };

  return (
    <div>
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Sign up successful! Please verify your email.</p>}
    </div>
  );
}

export default Signup;
