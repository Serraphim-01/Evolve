import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MissionCard } from './MissionCard';
import { Mission } from '../../types';
import { LineChartComponent } from './LineChart';
import { TerminalLog } from './TerminalLog';
import './Hacker.css';
import { MissionInfoModal } from './MissionInfoModal';

const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'PVP: Capture the Flag',
    description: 'Two players compete to solve a series of cryptographic puzzles to find the hidden flag.',
    xpReward: 200,
    createdBy: 'Admin',
    completions: 12,
    createdAt: '2024-01-22',
    type: 'timed',
    mode: 'pvp',
  },
  {
    id: '2',
    title: 'AI: Codebreaking Challenge',
    description: 'Face off against an AI to see who can decrypt a message faster.',
    xpReward: 150,
    createdBy: 'AI Master',
    completions: 5,
    createdAt: '2024-01-21',
    type: 'one-time',
    mode: 'pvsai',
  },
  {
    id: '3',
    title: 'Binary Tree Traversal',
    description: 'Implement pre-order, in-order, and post-order traversal algorithms for binary trees.',
    xpReward: 150,
    createdBy: 'TreeMaster',
    completions: 234,
    createdAt: '2024-01-20',
    type: 'normal',
    mode: 'normal',
  },
  {
    id: '4',
    title: 'REST API Design',
    description: 'Create a RESTful API for a book management system with CRUD operations.',
    xpReward: 100,
    createdBy: 'APIGuru',
    completions: 456,
    createdAt: '2024-01-19',
    type: 'normal',
    mode: 'normal',
  },
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const handleOpenModal = (mission: Mission) => {
    setSelectedMission(mission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMission(null);
  };

  const pvpMissions = mockMissions.filter(mission => mission.mode === 'pvp');
  const pvsaiMissions = mockMissions.filter(mission => mission.mode === 'pvsai');
  const normalMissions = mockMissions.filter(mission => mission.mode === 'normal');

  return (
    <div className="flex-1 bg-black min-h-screen p-8 font-mono">
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="glitch" data-text={`Welcome back, ${user?.username}!`}>
                Welcome back, {user?.username}!
              </h1>
              <p className="text-hacker-green text-base">&gt; Ready to tackle some new challenges?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div id="terminal-log-container" className="bg-black rounded-xl p-6 border border-hacker-green">
                    <h2 className="text-lg font-semibold text-hacker-green mb-4">
                        System Log
                    </h2>
                    <TerminalLog />
                </div>
                <LineChartComponent />
            </div>

            <div className="space-y-8">
              <div id="pvp">
                <h2 className="text-2xl font-bold text-white mb-4">Player vs. Player</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pvpMissions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} onCardClick={handleOpenModal} />
                  ))}
                </div>
              </div>

              <div id="pvsai">
                <h2 className="text-2xl font-bold text-white mb-4">Player vs. AI</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pvsaiMissions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} onCardClick={handleOpenModal} />
                  ))}
                </div>
              </div>

              <div id="normal">
                <h2 className="text-2xl font-bold text-white mb-4">Normal Challenges</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {normalMissions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} onCardClick={handleOpenModal} />
                  ))}
                </div>
              </div>
            </div>
            {isModalOpen && selectedMission && (
                <MissionInfoModal
                    mission={selectedMission}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    </div>
  );
};
