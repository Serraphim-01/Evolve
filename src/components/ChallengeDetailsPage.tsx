import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { missions } from '../data/missions';

export const ChallengeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mission = missions.find((m) => m.id === parseInt(id || ''));

  if (!mission) {
    return <div>Challenge not found!</div>;
  }

  const handleSolve = () => {
    navigate(`/challenges/${mission.id}/solve`);
  };

  return (
    <div>
      <h1>{mission.title}</h1>
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
      <button onClick={handleSolve}>Solve Challenge</button>
    </div>
  );
};
