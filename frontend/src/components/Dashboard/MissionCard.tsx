import React from 'react';
import { Mission } from '../../types';
import { Users, Award } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
  onCardClick: (mission: Mission) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, onCardClick }) => {
  return (
    <div
      className="bg-black border border-white rounded-lg p-4 hover:border-hacker-green transition-all duration-200 cursor-pointer group flex flex-col"
      onClick={() => onCardClick(mission)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="px-2 py-0.5 rounded-full text-xs font-medium text-white bg-blue-500/20">
          {mission.type}
        </div>
      </div>

      <h3 className="text-base font-semibold text-white mb-2 group-hover:text-hacker-green transition-colors flex-grow">
        {mission.title}
      </h3>

      <div className="flex items-center justify-between pt-4 border-t border-hacker-green mt-auto">
        <div className="flex flex-col text-sm text-white">
          <div className="flex items-center space-x-1" title={`${mission.completions} completions`}>
            <Users className="h-4 w-4" />
            <span>{mission.completions}</span>
          </div>
          <div className="flex items-center space-x-1" title={`${mission.xpReward} XP`}>
            <Award className="h-4 w-4" />
            <span>{mission.xpReward} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};