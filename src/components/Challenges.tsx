import React, { useState } from 'react';
import { ChallengeTypeModal } from './ChallengeTypeModal';
import { ChallengeDetailsModal } from './ChallengeDetailsModal';
import { ProcessingModal } from './ProcessingModal';
import { ChallengePreview } from './ChallengePreview';
import { missions } from '../data/missions';
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Challenges</h1>
        <button onClick={handleCreateChallengeClick}>Create Challenge</button>
      </div>

      <div className="missions-grid">
        {missions.map((mission) => (
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
