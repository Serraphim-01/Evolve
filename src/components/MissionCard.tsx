import React from 'react';
import { Mission } from '../data/missions';

interface MissionCardProps {
  mission: Mission;
}

export const MissionCard = ({ mission }: MissionCardProps) => {
  return (
    <div className="mission-card">
      <h3>{mission.title}</h3>
      <p>{mission.description}</p>
      <div className="mission-card-footer">
        <span>Difficulty: {mission.difficulty}</span>
        <span>EXP: {mission.exp}</span>
      </div>
      <div className="mission-card-tags">
        {mission.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};
