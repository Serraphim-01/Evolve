import React from 'react';
import { Modal } from './Modal';

export const ProcessingModal = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <h2>Processing...</h2>
      <p>Your challenge is being reviewed by our AI. Please wait a moment.</p>
    </Modal>
  );
};
