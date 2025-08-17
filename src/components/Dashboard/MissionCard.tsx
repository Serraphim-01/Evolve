import React from 'react';
import { Mission } from '../../types';
import { Code, Users, Award } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-hacker-green bg-hacker-green/20';
      case 'intermediate': return 'text-hacker-green bg-hacker-green/20';
      case 'advanced': return 'text-hacker-green bg-hacker-green/20';
      default: return 'text-white bg-white/20';
    }
  };

  return (
    <div className="bg-black border border-white rounded-lg p-6 hover:border-hacker-green transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-white" />
          <span className="text-sm font-medium text-white">{mission.language}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
          {mission.difficulty}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-hacker-green transition-colors">
        {mission.title}
      </h3>
      
      <p className="text-white text-sm mb-4 line-clamp-2">
        {mission.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {mission.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-black text-white text-xs rounded-md border border-white"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white">
        <div className="flex items-center space-x-4 text-sm text-white">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{mission.completions}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="h-4 w-4" />
            <span>{mission.xpReward} XP</span>
          </div>
        </div>
        <button className="bg-hacker-green text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-80 transition-colors">
          Start Mission
        </button>
      </div>
    </div>
  );
};