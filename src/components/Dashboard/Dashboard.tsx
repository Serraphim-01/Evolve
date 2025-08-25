import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MissionCard } from './MissionCard';
import { StatsCard } from './StatsCard';
import { Mission } from '../../types';
import { Trophy, Target, Users, Clock } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const mockMissions: Mission[] = [
  // ... (mock missions data remains the same)
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
    createdAt: '2024-01-20',
    type: 'test'
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
    createdAt: '2024-01-19',
    type: 'test'
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
    createdAt: '2024-01-18',
    type: 'debug'
  }
];

const xpData = [
  { name: 'Day 1', xp: 100 },
  { name: 'Day 2', xp: 250 },
  { name: 'Day 3', xp: 180 },
  { name: 'Day 4', xp: 300 },
  { name: 'Day 5', xp: 220 },
  { name: 'Day 6', xp: 400 },
  { name: 'Day 7', xp: 350 },
];

const missionTypeData = [
  { name: 'Test', value: 400 },
  { name: 'Debug', value: 300 },
  { name: 'Refactor', value: 300 },
  { name: 'New Feature', value: 200 },
];

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042'];

export const Dashboard = () => {
  const { user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const languages = ['all', 'JavaScript', 'Python', 'Java', 'C++', 'TypeScript'];
  
  const filteredMissions = selectedLanguage === 'all' 
    ? mockMissions 
    : mockMissions.filter(mission => mission.language === selectedLanguage);

  // Use mock data if user is not authenticated
  const stats = [
    { title: 'Missions Completed', value: user?.completedMissions || 42, icon: Trophy, color: 'text-hacker-green' },
    { title: 'Current Level', value: user?.level || 5, icon: Target, color: 'text-hacker-green' },
    { title: 'Total XP', value: user?.xp || 4850, icon: Users, color: 'text-hacker-green' },
    { title: 'Missions Created', value: user?.createdMissions || 12, icon: Clock, color: 'text-hacker-green' }
  ];

  return (
    <div className="flex-1 bg-black min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.username || 'Agent'}!
          </h1>
          <p className="text-white">Here is your mission overview and progress.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">XP Progression (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={xpData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                <Legend />
                <Line type="monotone" dataKey="xp" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Mission Types Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={missionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {missionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-black rounded-xl p-6 mb-8">
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
                      ? 'bg-hacker-green text-black'
                      : 'bg-black text-white hover:bg-hacker-green hover:text-black border border-white'
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