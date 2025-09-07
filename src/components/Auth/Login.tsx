import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Code, KeyRound, Sparkles } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handlePasskeyLogin = async () => {
    setLoading(true);
    try {
      // Mock passkey login
      await new Promise(resolve => setTimeout(resolve, 1000));
      await login('user@passkey.com', 'password'); // Mock login
    } catch (error) {
      console.error('Passkey login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLinkLogin = async () => {
    setLoading(true);
    try {
        // Mock magic link login
        await new Promise(resolve => setTimeout(resolve, 1000));
        await login('user@magiclink.com', 'password'); // Mock login
    } catch (error) {
        console.error('Magic link login failed:', error);
    } finally {
        setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white">Continue your coding journey</p>
        </div>

        <div className="space-y-4">
            <button
                onClick={handlePasskeyLogin}
                disabled={loading}
                className="w-full bg-hacker-green text-black py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <KeyRound className="mr-2 h-5 w-5" />
                {loading ? 'Signing In...' : 'Sign In with Passkey'}
            </button>
            <button
                onClick={handleMagicLinkLogin}
                disabled={loading}
                className="w-full bg-black border border-hacker-green text-hacker-green py-3 rounded-lg font-semibold hover:bg-hacker-green hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <Sparkles className="mr-2 h-5 w-5" />
                {loading ? 'Sending Link...' : 'Sign In with Magic Link'}
            </button>
        </div>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {showPasswordLogin ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-black border border-white rounded-lg focus:border-hacker-green focus:outline-none text-white placeholder-white"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-white hover:text-hacker-green transition-colors"
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-hacker-green text-black py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        ) : (
            <div className="text-center">
                <button
                    onClick={() => setShowPasswordLogin(true)}
                    className="text-hacker-green hover:underline"
                >
                    Sign in with password
                </button>
            </div>
        )}


        <div className="text-center text-white mt-6">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-hacker-green hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            <Link to="#" className="text-sm text-white hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};