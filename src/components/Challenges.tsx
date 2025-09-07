import React, { useState, useMemo } from 'react';
import { ChallengeTypeModal } from './ChallengeTypeModal';
import { ChallengeCreationDetailsModal } from './ChallengeCreationDetailsModal';
import { ProcessingModal } from './ProcessingModal';
import { ChallengePreview } from './ChallengePreview';
import { missions, Mission } from '../data/missions';
import { MissionCard } from './MissionCard';

export const Challenges = () => {
  // State for creating challenges
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isCreationDetailsModalOpen, setIsCreationDetailsModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const [newChallenge, setNewChallenge] = useState({
    type: '',
    question: '',
    language: '',
    testCase: '',
  });

  // State for filters
  const [filterType, setFilterType] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('Easy');
  const [languageFilter, setLanguageFilter] = useState('JavaScript');
  const [tagFilter, setTagFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('1-2');

  const availableLanguages = useMemo(() => [...new Set(missions.map(m => m.language))], []);
  const availableTags = useMemo(() => [...new Set(missions.flatMap(m => m.tags))], []);

  const handleCreateChallengeClick = () => {
    setIsTypeModalOpen(true);
  };

  const handleTypeSelect = (type: string) => {
    setNewChallenge((prev) => ({ ...prev, type }));
    setIsTypeModalOpen(false);
    setIsCreationDetailsModalOpen(true);
  };

  const handleCreationDetailsSubmit = (details: { question: string; language: string; testCase: string }) => {
    setNewChallenge((prev) => ({ ...prev, ...details }));
    setIsCreationDetailsModalOpen(false);
    setIsProcessingModalOpen(true);

    setTimeout(() => {
      setIsProcessingModalOpen(false);
      setIsPreviewModalOpen(true);
    }, 3000);
  };

  const handlePreviewSubmit = () => {
    console.log('Challenge created:', newChallenge);
    setIsPreviewModalOpen(false);
    alert('Challenge created successfully!');
  };

  const filteredMissions = missions.filter(mission => {
    if (filterType === 'All') return true;
    if (filterType === 'Difficulty') return mission.difficulty === difficultyFilter;
    if (filterType === 'Language') return mission.language === languageFilter;
    if (filterType === 'Tag') return mission.tags.includes(tagFilter);
    if (filterType === 'Recommended Level') {
      const [min, max] = levelFilter.split('-').map(Number);
      return mission.recommendedLevel >= min && mission.recommendedLevel <= max;
    }
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Challenges</h1>
        <button onClick={handleCreateChallengeClick}>Create Challenge</button>
      </div>

      <div className="filters">
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option>All</option>
          <option>Difficulty</option>
          <option>Language</option>
          <option>Tag</option>
          <option>Recommended Level</option>
        </select>

        {filterType === 'Difficulty' && (
          <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value as 'Easy' | 'Medium' | 'Hard')}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        )}
        {filterType === 'Language' && (
          <select value={languageFilter} onChange={e => setLanguageFilter(e.target.value)}>
            {availableLanguages.map(lang => <option key={lang}>{lang}</option>)}
          </select>
        )}
        {filterType === 'Tag' && (
          <select value={tagFilter} onChange={e => setTagFilter(e.target.value)}>
            <option value="">All Tags</option>
            {availableTags.map(tag => <option key={tag}>{tag}</option>)}
          </select>
        )}
        {filterType === 'Recommended Level' && (
          <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)}>
            <option>1-2</option>
            <option>3-5</option>
            <option>6-8</option>
            <option>9-10</option>
          </select>
        )}
      </div>

      <div className="missions-grid">
        {filteredMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>

      {/* Modals for creating a challenge */}
      <ChallengeTypeModal isOpen={isTypeModalOpen} onClose={() => setIsTypeModalOpen(false)} onSelect={handleTypeSelect} />
      <ChallengeCreationDetailsModal isOpen={isCreationDetailsModalOpen} onClose={() => setIsCreationDetailsModalOpen(false)} onSubmit={handleCreationDetailsSubmit} />
      <ProcessingModal isOpen={isProcessingModalOpen} />
      <ChallengePreview isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} onSubmit={handlePreviewSubmit} challenge={newChallenge} />
    </div>
  );
};
