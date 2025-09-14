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
  ChevronsRight,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [challengesOpen, setChallengesOpen] = useState(false);

  if (!isAuthenticated) return null;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    {
      label: 'Challenges',
      icon: Code,
      children: [
        { path: '/dashboard#pvp', label: 'Player vs. Player' },
        { path: '/dashboard#pvsai', label: 'Player vs. AI' },
        { path: '/dashboard#normal', label: 'Normal Challenges' },
      ]
    },
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
        {navItems.map((item) => {
          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => setChallengesOpen(!challengesOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname.startsWith('/dashboard')
                      ? 'bg-hacker-green text-black'
                      : 'text-white hover:bg-hacker-green hover:text-black'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown className={`h-5 w-5 transition-transform ${challengesOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {challengesOpen && !isCollapsed && (
                  <div className="pl-8 pt-2 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="flex items-center space-x-3 px-4 py-2 rounded-lg text-white hover:bg-hacker-green hover:text-black transition-all duration-200"
                        title={child.label}
                      >
                        <span className="font-medium text-sm">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-hacker-green text-black'
                  : 'text-white hover:bg-hacker-green hover:text-black'
              }`}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
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