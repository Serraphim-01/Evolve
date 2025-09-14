import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MissionCard } from '../Dashboard/MissionCard';
import { Mission } from '../../types';
import { MissionInfoModal } from '../Dashboard/MissionInfoModal';

// This mock data would typically come from an API call
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

export const Challenges = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setFilter(hash);
    } else {
      setFilter('all');
    }
  }, [location]);

  const handleOpenModal = (mission: Mission) => {
    setSelectedMission(mission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMission(null);
  };

  const filteredMissions = mockMissions.filter(mission => {
    if (filter === 'all') return true;
    return mission.mode === filter;
  });

  const pvpMissions = filteredMissions.filter(mission => mission.mode === 'pvp');
  const pvsaiMissions = filteredMissions.filter(mission => mission.mode === 'pvsai');
  const normalMissions = filteredMissions.filter(mission => mission.mode === 'normal');

  return (
    <div className="flex-1 bg-black min-h-screen p-8 font-mono">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Challenges</h1>
        <div className="space-y-8">
          {(filter === 'all' || filter === 'pvp') && (
            <div id="pvp">
              <h2 className="text-2xl font-bold text-white mb-4">Player vs. Player</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pvpMissions.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} onCardClick={handleOpenModal} />
                ))}
              </div>
            </div>
          )}

          {(filter === 'all' || filter === 'pvsai') && (
            <div id="pvsai">
              <h2 className="text-2xl font-bold text-white mb-4">Player vs. AI</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pvsaiMissions.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} onCardClick={handleOpenModal} />
                ))}
              </div>
            </div>
          )}

          {(filter === 'all' || filter === 'normal') && (
            <div id="normal">
              <h2 className="text-2xl font-bold text-white mb-4">Normal Challenges</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {normalMissions.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} onCardClick={handleOpenModal} />
                ))}
              </div>
            </div>
          )}
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
