import React, { useState } from 'react';
import { Modal } from './Modal';

interface ChallengeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { question: string; language: string; testCase: string }) => void;
}

export const ChallengeDetailsModal = ({ isOpen, onClose, onSubmit }: ChallengeDetailsModalProps) => {
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [testCase, setTestCase] = useState('');

  const languages = ['JavaScript', 'Python', 'Java', 'C++'];

  const handleSubmit = () => {
    onSubmit({ question, language, testCase });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Challenge Details</h2>
      <form>
        <div>
          <label>Challenge Question</label>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
        </div>
        <div>
          <label>Programming Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Test Case</label>
          <textarea value={testCase} onChange={(e) => setTestCase(e.target.value)} />
        </div>
        <button type="button" onClick={handleSubmit}>Submit for AI review</button>
      </form>
    </Modal>
  );
};
