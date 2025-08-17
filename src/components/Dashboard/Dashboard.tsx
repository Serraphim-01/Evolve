import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MissionCard } from './MissionCard';
import { StatsCard } from './StatsCard';
import { Mission } from '../../types';
import { Trophy, Target, Users, Clock } from 'lucide-react';

const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Binary Tree Traversal',
    description: 'Implement pre-order, in-order, and post-order traversal algorithms for binary trees.',
    language: 'JavaScript',
    difficulty: 'intermediate',
    xpReward: 150,
    createdBy: 'TreeMaster',
    completions: 234,
    tags: ['algorithms', 'trees', 'recursion'],
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'REST API Design',
    description: 'Create a RESTful API for a book management system with CRUD operations.',
    language: 'Python',
    difficulty: 'beginner',
    xpReward: 100,
    createdBy: 'APIGuru',
    completions: 456,
    tags: ['api', 'backend', 'flask'],
    createdAt: '2024-01-19'
  },
  {
    id: '3',
    title: 'Dynamic Programming Challenge',
    description: 'Solve the coin change problem using dynamic programming approach.',
    language: 'Java',
    difficulty: 'advanced',
    xpReward: 250,
    createdBy: 'DPChampion',
    completions: 89,
    tags: ['dynamic-programming', 'optimization', 'algorithms'],
    createdAt: '2024-01-18'
  }
];

export const Dashboard = () => {
  const { user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const languages = ['all', 'JavaScript', 'Python', 'Java', 'C++', 'TypeScript'];
  
  const filteredMissions = selectedLanguage === 'all' 
    ? mockMissions 
    : mockMissions.filter(mission => mission.language === selectedLanguage);

  const stats = [
    { title: 'Missions Completed', value: user?.completedMissions || 0, icon: Trophy, color: 'text-yellow-400' },
    { title: 'Current Level', value: user?.level || 0, icon: Target, color: 'text-blue-400' },
    { title: 'Total XP', value: user?.xp || 0, icon: Users, color: 'text-green-400' },
    { title: 'Missions Created', value: user?.createdMissions || 0, icon: Clock, color: 'text-purple-400' }
  ];

  return (
    <div className="flex-1 bg-black min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-400">Ready to tackle some new challenges?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 sm:mb-0">
              Available Missions
            </h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLanguage === lang
                      ? 'bg-white text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {lang === 'all' ? 'All Languages' : lang}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};