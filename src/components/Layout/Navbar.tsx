import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  User, 
  Settings, 
  MessageSquare, 
  LogOut, 
  Code,
  Plus,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isAuthenticated) return null;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className={`bg-black border-r border-white min-h-screen p-4 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between mb-8">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'hidden' : ''}`}>
            <div className="bg-hacker-green rounded-lg p-2">
              <Code className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Evolve</h1>
              <p className="text-white text-sm">Learn by doing</p>
            </div>
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-white hover:text-hacker-green">
            {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </button>
      </div>

      {user && (
        <div className={`bg-black rounded-lg p-4 mb-6 ${isCollapsed ? 'hidden' : ''}`}>
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-white font-medium">{user.username}</p>
              <p className="text-white text-sm">Level {user.level}</p>
            </div>
          </div>
          <div className="bg-black rounded-full h-2 mb-2">
            <div
              className="bg-hacker-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${(user.xp % 100)}%` }}
            ></div>
          </div>
          <p className="text-white text-xs">{user.xp} XP</p>
        </div>
      )}

      <div className="space-y-2 mb-8 flex-grow">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === path
                ? 'bg-hacker-green text-black'
                : 'text-white hover:bg-hacker-green hover:text-black'
            }`}
            title={label}
          >
            <Icon className="h-5 w-5" />
            {!isCollapsed && <span className="font-medium">{label}</span>}
          </Link>
        ))}
      </div>

      <div className="space-y-2 border-t border-white pt-6">
        <Link
          to="/create-mission"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-hacker-green hover:text-black transition-all duration-200"
          title="Create Mission"
        >
          <Plus className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Create Mission</span>}
        </Link>
        
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-hacker-green hover:text-black transition-all duration-200 w-full"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </nav>
  );
};