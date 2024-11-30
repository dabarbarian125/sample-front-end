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
    <div className="max-w-md mx-auto bg-primary p-6 rounded-lg shadow">
      {step === 'signup' && (
        <>
          <h2 className="text-2xl font-semibold text-center text-accent mb-4">Sign Up</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-textColor font-medium mb-1" htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-textColor font-medium mb-1" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                type="password"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent-dark"
            >
              Sign Up
            </button>
          </form>
        </>
      )}

      {step === 'confirm' && (
        <>
          <h2 className="text-2xl font-semibold text-center text-accent mb-4">Confirm Your Email</h2>
          <p className="text-textColor mb-4">
            A confirmation code has been sent to your email. Please enter it below to confirm your account.
          </p>
          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <label className="block text-textColor font-medium mb-1" htmlFor="confirmation-code">
                Confirmation Code
              </label>
              <input
                id="confirmation-code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                placeholder="Enter confirmation code"
                type="text"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent-dark"
            >
              Confirm Email
            </button>
          </form>
        </>
      )}

      {step === 'confirmed' && (
        <div className="text-center">
          <p className="text-green-600 font-semibold">
            Email confirmed successfully! You can now log in.
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {success && step === 'signup' && (
        <div className="mt-4">
          <p className="text-green-600">
            Sign up successful! Please check your email for a confirmation code.
          </p>
        </div>
      )}
    </div>
  );
}

export default Signup;
