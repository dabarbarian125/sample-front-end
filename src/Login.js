// src/Login.js

import React, { useState } from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userPool from './UserPool';

function Login({ setAuthTokens }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For displaying login errors

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
        setError('');
      },
      onFailure: (err) => {
        console.error('Login error:', err); // Debug log
        setError(err.message || 'An error occurred during login.');
      },
    });
  };

  return (
    <div className="max-w-md mx-auto bg-primary p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center text-accent mb-4">Log In</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-textColor font-medium mb-1" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-textColor font-medium mb-1" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent-dark"
        >
          Log In
        </button>
      </form>
      {error && (
        <div className="mt-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
