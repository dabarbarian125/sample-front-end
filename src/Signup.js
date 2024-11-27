// src/Signup.js

import React, { useState } from 'react';
import userPool from './UserPool';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Signup form submitted:', { email, password }); // Debug log

    userPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error('Sign up error:', err); // Debug log
      } else {
        console.log('Sign up success:', data); // Debug log
      }
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;