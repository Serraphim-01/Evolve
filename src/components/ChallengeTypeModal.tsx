import React from 'react';
import { Modal } from './Modal';

interface ChallengeTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
}

export const ChallengeTypeModal = ({ isOpen, onClose, onSelect }: ChallengeTypeModalProps) => {
  const challengeTypes = ['Multi Challenge', 'Timed Challenge', 'Single Challenge'];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Select Challenge Type</h2>
      <div>
        {challengeTypes.map((type) => (
          <button key={type} onClick={() => onSelect(type)}>
            {type}
          </button>
        ))}
      </div>
    </Modal>
  );
};
