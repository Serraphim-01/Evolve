import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Trophy, Target, Code, Star } from 'lucide-react';
import { Achievement } from '../../types';

const mockAchievements: Achievement[] = [
  { id: '1', title: 'First Steps', description: 'Complete your first mission', icon: '🏁', unlocked: true, unlockedAt: '2024-01-15' },
  { id: '2', title: 'Code Warrior', description: 'Complete 10 missions', icon: '⚔️', unlocked: true, unlockedAt: '2024-01-18' },
  { id: '3', title: 'Language Explorer', description: 'Complete missions in 3 different languages', icon: '🌍', unlocked: true, unlockedAt: '2024-01-20' },
  { id: '4', title: 'Mission Master', description: 'Complete 50 missions', icon: '👑', unlocked: false },
  { id: '5', title: 'Community Builder', description: 'Create 5 missions', icon: '🏗️', unlocked: false },
  { id: '6', title: 'Mentor', description: 'Help 10 other developers', icon: '🎓', unlocked: false },
];

export const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const progressToNextLevel = (user.xp % 200) / 200 * 100;

  return (
    <div className="flex-1 bg-black min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black border border-white rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-24 h-24 rounded-full border-4 border-hacker-green"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
              <p className="text-white mb-4">{user.email}</p>
              
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-white" />
                  <span className="text-white">Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-white" />
                  <span className="text-white">Level {user.level}</span>
                </div>
              </div>
              
              <div className="bg-black rounded-full h-3 mb-2 border border-white">
                <div 
                  className="bg-hacker-green h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressToNextLevel}%` }}
                ></div>
              </div>
              <p className="text-sm text-white">
                {user.xp} / {Math.ceil(user.xp / 200) * 200} XP to level {user.level + 1}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black border border-white rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="h-6 w-6 text-hacker-green" />
              <h3 className="text-lg font-semibold text-white">Missions Completed</h3>
            </div>
            <p className="text-3xl font-bold text-white">{user.completedMissions}</p>
          </div>
          
          <div className="bg-black border border-white rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="h-6 w-6 text-hacker-green" />
              <h3 className="text-lg font-semibold text-white">Missions Created</h3>
            </div>
            <p className="text-3xl font-bold text-white">{user.createdMissions}</p>
          </div>
          
          <div className="bg-black border border-white rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="h-6 w-6 text-hacker-green" />
              <h3 className="text-lg font-semibold text-white">Total XP</h3>
            </div>
            <p className="text-3xl font-bold text-white">{user.xp}</p>
          </div>
        </div>

        <div className="bg-black border border-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  achievement.unlocked
                    ? 'bg-black border-hacker-green'
                    : 'bg-black border-white opacity-60'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h3 className={`font-semibold mb-2 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${achievement.unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && achievement.unlockedAt && (
                  <p className="text-xs text-gray-400 mt-2">
                    Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};