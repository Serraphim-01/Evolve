import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { startAuthentication } from '@simplewebauthn/browser';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePasskeyLogin = async () => {
    try {
      // Mock authentication options
      const options = {
        challenge: 'mock-challenge',
        rpId: window.location.hostname,
        allowCredentials: [],
        userVerification: 'preferred' as const,
        timeout: 60000,
      };

      // Wrap the options in an object with optionsJSON property
      const authenticationResponse = await startAuthentication({
        optionsJSON: options
      });
      console.log('Authentication response:', authenticationResponse);
      login();
      navigate('/dashboard');
    } catch (error) {
      console.error('Passkey login failed:', error);
      alert('Passkey login failed. Please try again.');
    }
  };

  const handleMagicLinkLogin = () => {
    // Mock magic link logic
    console.log('Simulating magic link login...');
    login();
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handlePasskeyLogin}>Login with Passkey</button>
      <button onClick={handleMagicLinkLogin}>Login with Magic Link</button>
    </div>
  );
};
