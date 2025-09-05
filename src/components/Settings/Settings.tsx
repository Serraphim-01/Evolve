import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User,
  Trash2,
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save
} from 'lucide-react';

export const Settings = () => {
  const { user, clearOtherUsers } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [notifications, setNotifications] = useState({
    missionUpdates: true,
    achievementUnlocks: true,
    chatMessages: false,
    weeklyDigest: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black border border-white rounded-lg focus:border-hacker-green focus:outline-none text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black border border-white rounded-lg focus:border-hacker-green focus:outline-none text-white"
                  />
                </div>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 bg-hacker-green text-black px-6 py-3 rounded-lg font-medium hover:bg-opacity-80 transition-colors">
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </button>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-black border border-white rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h4>
                    <p className="text-sm text-white">
                      {key === 'missionUpdates' && 'Get notified about new missions and updates'}
                      {key === 'achievementUnlocks' && 'Celebrate when you unlock new achievements'}
                      {key === 'chatMessages' && 'Receive notifications for chat messages'}
                      {key === 'weeklyDigest' && 'Weekly summary of your progress'}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleNotification(key as keyof typeof notifications)}
                    className={`w-12 h-6 rounded-full transition-colors border border-white ${
                      value ? 'bg-hacker-green' : 'bg-black'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full transition-transform ${
                        value 
                          ? 'bg-black transform translate-x-6' 
                          : 'bg-white transform translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Security Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-black border border-white rounded-lg focus:border-hacker-green focus:outline-none text-white"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-3.5 text-white hover:text-hacker-green"
                  >
                    {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-black border border-white rounded-lg focus:border-hacker-green focus:outline-none text-white"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-3.5 text-white hover:text-hacker-green"
                  >
                    {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-black border border-white rounded-lg focus:border-hacker-green focus:outline-none text-white"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-3.5 text-white hover:text-hacker-green"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 bg-hacker-green text-black px-6 py-3 rounded-lg font-medium hover:bg-opacity-80 transition-colors">
              <Save className="h-5 w-5" />
              <span>Update Password</span>
            </button>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <h4 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h4>
              <p className="text-white mb-4">
                This action will permanently delete all other user accounts and transfer their progress to you. This cannot be undone.
              </p>
              <button
                onClick={async () => {
                  if (window.confirm('Are you sure you want to delete all other users and transfer their progress? This action is irreversible.')) {
                    await clearOtherUsers();
                  }
                }}
                className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
                <span>Clear All Other Users</span>
              </button>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Preferences</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-black border border-white rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Globe className="h-5 w-5 text-white" />
                  <h4 className="font-medium text-white">Language</h4>
                </div>
                <select className="w-full p-3 bg-black border border-white rounded-lg text-white focus:border-hacker-green focus:outline-none">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div className="p-4 bg-black border border-white rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Palette className="h-5 w-5 text-white" />
                  <h4 className="font-medium text-white">Theme</h4>
                </div>
                <p className="text-sm text-white mb-3">Currently using Dark Mode (Black)</p>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-black border-2 border-hacker-green rounded-lg"></div>
                  <div className="w-8 h-8 bg-gray-800 border border-white rounded-lg opacity-50"></div>
                  <div className="w-8 h-8 bg-gray-600 border border-white rounded-lg opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-black min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white">Manage your account preferences and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-black border border-white rounded-xl p-4">
              <nav className="space-y-2">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === id
                        ? 'bg-hacker-green text-black'
                        : 'text-white hover:bg-hacker-green hover:text-black'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-black border border-white rounded-xl p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};