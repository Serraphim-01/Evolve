import React from 'react';
import { useNavigate } from 'react-router-dom';
import { startRegistration } from '@simplewebauthn/browser';

export const Signup = () => {
  const navigate = useNavigate();

  const handlePasskeySignup = async () => {
    try {
      // Mock registration options
      const options = {
        rp: {
          name: 'My App',
          id: window.location.hostname,
        },
        user: {
          id: 'user-id',
          name: 'user@example.com',
          displayName: 'User',
        },
        challenge: 'mock-challenge',
        pubKeyCredParams: [{ alg: -7, type: 'public-key' as const }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform' as const,
        },
        timeout: 60000,
        attestation: 'direct' as const,
      };

      // Wrap the options in an object with optionsJSON property
      const registrationResponse = await startRegistration({
        optionsJSON: options
      });
      console.log('Registration response:', registrationResponse);
      alert('Passkey registration successful! Please proceed to login.');
      navigate('/login');
    } catch (error) {
      console.error('Passkey registration failed:', error);
      alert('Passkey registration failed. Please try again.');
    }
  };

  const handleMagicLinkSignup = () => {
    // Mock magic link logic
    console.log('Simulating magic link signup...');
    alert('Magic link sent! Please check your email.');
    navigate('/login');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <button onClick={handlePasskeySignup}>Sign up with Passkey</button>
      <button onClick={handleMagicLinkSignup}>Sign up with Magic Link</button>
    </div>
  );
};
