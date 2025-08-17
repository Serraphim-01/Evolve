import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  User, 
  Settings, 
  MessageSquare, 
  LogOut, 
  Code,
  Trophy,
  Plus
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-black border-r border-gray-800 w-64 min-h-screen p-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-white rounded-lg p-2">
          <Code className="h-6 w-6 text-black" />
        </div>
        <div>
          <h1 className="text-white font-bold text-xl">CodeQuest</h1>
          <p className="text-gray-400 text-sm">Learn by doing</p>
        </div>
      </div>

      {user && (
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-white font-medium">{user.username}</p>
              <p className="text-gray-400 text-sm">Level {user.level}</p>
            </div>
          </div>
          <div className="bg-black rounded-full h-2 mb-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(user.xp % 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-xs">{user.xp} XP</p>
        </div>
      )}

      <div className="space-y-2 mb-8">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === path
                ? 'bg-white text-black'
                : 'text-gray-300 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </div>

      <div className="space-y-2 border-t border-gray-800 pt-6">
        <Link
          to="/create-mission"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-white transition-all duration-200"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Create Mission</span>
        </Link>
        
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-white transition-all duration-200 w-full"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
};