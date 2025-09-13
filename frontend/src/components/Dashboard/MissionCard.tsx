import React from 'react';
import { Link } from 'react-router-dom';
import { Mission } from '../../types';
import { Users, Award, Play } from 'lucide-react';
import { getLanguageIcon, getDifficultyIcon } from '../../utils/iconUtils';

interface MissionCardProps {
  mission: Mission;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  return (
    <div className="bg-black border border-white rounded-lg p-4 hover:border-hacker-green transition-all duration-200 cursor-pointer group flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2" title={mission.language}>
          {getLanguageIcon(mission.language)}
        </div>
        <div className="flex items-center space-x-2" title={mission.difficulty}>
          {getDifficultyIcon(mission.difficulty)}
          <div className="px-2 py-0.5 rounded-full text-xs font-medium text-white bg-blue-500/20">
            {mission.type}
          </div>
        </div>
      </div>

      <h3 className="text-base font-semibold text-white mb-2 group-hover:text-hacker-green transition-colors flex-grow">
        {mission.title}
      </h3>

      <div className="flex flex-wrap gap-1 mb-3">
        {mission.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-black text-white text-xs rounded-md border border-white"
          >
            #{tag}
          </span>
        ))}
      </div>

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
        <Link to={`/mission/${mission.id}`} className="bg-hacker-green text-black p-2 rounded-full hover:bg-opacity-80 transition-colors" title="Start Mission">
          <Play className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};