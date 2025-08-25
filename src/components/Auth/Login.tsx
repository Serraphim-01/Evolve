import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Code, KeyRound, Zap } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handlePasskeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLinkSubmit = async () => {
    // TODO: Implement magic link flow
    alert('Magic link functionality not yet implemented.');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-hacker-green rounded-lg p-3 w-12 h-12 mx-auto mb-4">
            <Code className="h-6 w-6 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handlePasskeySubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-white" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black border border-white rounded-lg focus:border-hacker-green focus:outline-none text-white placeholder-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-hacker-green text-black py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <KeyRound className="h-5 w-5" />
            <span>{loading ? 'Signing In...' : 'Sign in with Passkey'}</span>
          </button>
        </form>

        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <button
          onClick={handleMagicLinkSubmit}
          disabled={loading}
          className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Zap className="h-5 w-5" />
          <span>Sign in with Email Magic Link</span>
        </button>

        <p className="text-center text-white mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-hacker-green hover:underline">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
};