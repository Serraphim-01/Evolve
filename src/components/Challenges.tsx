import React, { useState } from 'react';
import { ChallengeTypeModal } from './ChallengeTypeModal';
import { ChallengeDetailsModal } from './ChallengeDetailsModal';
import { ProcessingModal } from './ProcessingModal';
import { ChallengePreview } from './ChallengePreview';
import { missions, Mission } from '../data/missions';
import { MissionCard } from './MissionCard';

export const Challenges = () => {
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const [challenge, setChallenge] = useState({
    type: '',
    question: '',
    language: '',
    testCase: '',
  });

  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  const handleCreateChallengeClick = () => {
    setIsTypeModalOpen(true);
  };

  const handleTypeSelect = (type: string) => {
    setChallenge((prev) => ({ ...prev, type }));
    setIsTypeModalOpen(false);
    setIsDetailsModalOpen(true);
  };

  const handleDetailsSubmit = (details: { question: string; language: string; testCase: string }) => {
    setChallenge((prev) => ({ ...prev, ...details }));
    setIsDetailsModalOpen(false);
    setIsProcessingModalOpen(true);

    // Simulate AI review processing time
    setTimeout(() => {
      setIsProcessingModalOpen(false);
      setIsPreviewModalOpen(true);
    }, 3000);
  };

  const handlePreviewSubmit = () => {
    console.log('Challenge created:', challenge);
    setIsPreviewModalOpen(false);
    alert('Challenge created successfully!');
  };

  const filteredMissions = difficultyFilter === 'All'
    ? missions
    : missions.filter((mission) => mission.difficulty === difficultyFilter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Challenges</h1>
        <button onClick={handleCreateChallengeClick}>Create Challenge</button>
      </div>

      <div className="filters">
        <span>Filter by difficulty:</span>
        <button onClick={() => setDifficultyFilter('All')} className={difficultyFilter === 'All' ? 'active' : ''}>All</button>
        <button onClick={() => setDifficultyFilter('Easy')} className={difficultyFilter === 'Easy' ? 'active' : ''}>Easy</button>
        <button onClick={() => setDifficultyFilter('Medium')} className={difficultyFilter === 'Medium' ? 'active' : ''}>Medium</button>
        <button onClick={() => setDifficultyFilter('Hard')} className={difficultyFilter === 'Hard' ? 'active' : ''}>Hard</button>
      </div>

      <div className="missions-grid">
        {filteredMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>

      <ChallengeTypeModal
        isOpen={isTypeModalOpen}
        onClose={() => setIsTypeModalOpen(false)}
        onSelect={handleTypeSelect}
      />

      <ChallengeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onSubmit={handleDetailsSubmit}
      />

      <ProcessingModal isOpen={isProcessingModalOpen} />

      <ChallengePreview
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onSubmit={handlePreviewSubmit}
        challenge={challenge}
      />
    </div>
  );
};
