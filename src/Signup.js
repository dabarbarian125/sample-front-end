// src/Signup.js

import React, { useState } from 'react';
import userPool from './UserPool';
import { CognitoUser } from 'amazon-cognito-identity-js';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [step, setStep] = useState('signup'); // Tracks current step: signup or confirmation
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle signup
  const handleSignup = (event) => {
    event.preventDefault();

    const attributes = [
      { Name: 'email', Value: email }, // Cognito uses "email" as the attribute name
    ];

    console.log('Signup form submitted:', { email, password });

    userPool.signUp(email, password, attributes, null, (err, data) => {
      if (err) {
        console.error('Sign up error:', err);
        setError(err.message || 'An error occurred during signup.');
        setSuccess(false);
      } else {
        console.log('Sign up success:', data);
        setError('');
        setStep('confirm'); // Move to confirmation step
      }
    });
  };

  // Handle confirmation
  const handleConfirm = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    console.log('Confirming user with code:', confirmationCode);

    user.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error('Confirmation error:', err);
        setError(err.message || 'An error occurred during confirmation.');
        setSuccess(false);
      } else {
        console.log('Confirmation success:', result);
        setError('');
        setSuccess(true);
        setStep('confirmed'); // Mark as confirmed
      }
    });
  };

  return (
    <div>
      {step === 'signup' && (
        <form onSubmit={handleSignup}>
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
      )}

      {step === 'confirm' && (
        <form onSubmit={handleConfirm}>
          <input 
            value={confirmationCode} 
            onChange={(e) => setConfirmationCode(e.target.value)} 
            placeholder="Confirmation Code" 
            type="text" 
            required 
          />
          <button type="submit">Confirm Email</button>
        </form>
      )}

      {step === 'confirmed' && (
        <p style={{ color: 'green' }}>Email confirmed successfully! You can now log in.</p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && step === 'signup' && <p style={{ color: 'green' }}>Sign up successful! Please check your email for a confirmation code.</p>}
    </div>
  );
}

export default Signup;
