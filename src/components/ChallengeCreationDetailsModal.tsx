import React from 'react';
import { Modal } from './Modal';
import { Mission } from '../data/missions';

interface ChallengeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolve: () => void;
  mission: Mission | null;
}

export const ChallengeDetailsModal = ({ isOpen, onClose, onSolve, mission }: ChallengeDetailsModalProps) => {
  if (!mission) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>{mission.title}</h2>
      <p>{mission.description}</p>
      <hr />
      <p><strong>Language:</strong> {mission.language}</p>
      <p><strong>Difficulty:</strong> {mission.difficulty}</p>
      <p><strong>Base EXP:</strong> {mission.exp}</p>
      <p><strong>Expected Time to Solve:</strong> {mission.expectedTimeToSolve}</p>
      <p><strong>Recommended Level:</strong> {mission.recommendedLevel}</p>
      <div className="mission-card-tags">
        {mission.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <button onClick={onSolve}>Solve Challenge</button>
    </Modal>
  );
};
