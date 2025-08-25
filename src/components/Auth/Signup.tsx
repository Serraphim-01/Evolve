import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, User, Code, KeyRound } from 'lucide-react';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // This will be updated to use passkeys
      await signup(username, email);
    } catch (error) {
      console.error('Signup failed:', error);
      // You might want to show an error to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-hacker-green rounded-lg p-3 w-12 h-12 mx-auto mb-4">
            <Code className="h-6 w-6 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join Evolve</h1>
          <p className="text-white">Create your passwordless account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-white" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black border border-white rounded-lg focus:border-hacker-green focus:outline-none text-white placeholder-white"
              required
            />
          </div>

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
            <span>{loading ? 'Registering...' : 'Register with Passkey'}</span>
          </button>
        </form>

        <p className="text-center text-white mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-hacker-green hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};