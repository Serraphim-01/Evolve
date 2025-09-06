import React from 'react';
import { Modal } from './Modal';

interface ChallengePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  challenge: {
    question: string;
    language: string;
    testCase: string;
    type: string;
  };
}

export const ChallengePreview = ({ isOpen, onClose, onSubmit, challenge }: ChallengePreviewProps) => {
  // Mock data for the preview
  const previewDetails = {
    environment: 'Node.js v18',
    difficulty: 'Medium',
    baseExp: '150 XP',
    timeToSolve: '30 minutes',
    tags: ['arrays', 'strings', 'algorithms'],
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Challenge Preview</h2>
      <div>
        <h3>{challenge.question}</h3>
        <p><strong>Type:</strong> {challenge.type}</p>
        <p><strong>Language:</strong> {challenge.language}</p>
        <p><strong>Test Case:</strong></p>
        <pre>{challenge.testCase}</pre>
        <hr />
        <p><strong>Environment:</strong> {previewDetails.environment}</p>
        <p><strong>Difficulty:</strong> {previewDetails.difficulty}</p>
        <p><strong>Base EXP:</strong> {previewDetails.baseExp}</p>
        <p><strong>Time to Solve:</strong> {previewDetails.timeToSolve}</p>
        <p><strong>Tags:</strong> {previewDetails.tags.join(', ')}</p>
      </div>
      <button onClick={onSubmit}>Create Challenge</button>
    </Modal>
  );
};
