import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code, KeyRound } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();

  const handleProceed = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-hacker-green rounded-lg p-3 w-12 h-12 mx-auto mb-4">
            <Code className="h-6 w-6 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white">Proceed to the dashboard to continue your journey</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleProceed}
            className="w-full bg-hacker-green text-black py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors flex items-center justify-center space-x-2"
          >
            <KeyRound className="h-5 w-5" />
            <span>Proceed to Dashboard</span>
          </button>
        </div>

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