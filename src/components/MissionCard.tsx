import React from 'react';
import { Link } from 'react-router-dom';
import { Mission } from '../data/missions';

interface MissionCardProps {
  mission: Mission;
}

export const MissionCard = ({ mission }: MissionCardProps) => {
  return (
    <Link to={`/challenges/${mission.id}/details`} className="mission-card-link">
      <div className="mission-card">
        <h3 className="mission-title">{mission.title}</h3>
        <div className="mission-details">
          <p><strong>Language:</strong> {mission.language}</p>
          <p><strong>Difficulty:</strong> {mission.difficulty}</p>
          <p><strong>Base EXP:</strong> {mission.exp}</p>
        </div>
        <div className="mission-card-tags">
          {mission.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};
