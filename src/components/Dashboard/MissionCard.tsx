import React from 'react';
import { Link } from 'react-router-dom';
import { Mission } from '../../types';
import { Code, Users, Award, Play, Braces, FileJson, Coffee, Plus, Type, SignalLow, SignalMedium, SignalHigh } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
}

const getLanguageIcon = (language: string) => {
    switch (language) {
        case 'JavaScript': return <Braces className="h-5 w-5 text-white" />;
        case 'Python': return <FileJson className="h-5 w-5 text-white" />;
        case 'Java': return <Coffee className="h-5 w-5 text-white" />;
        case 'C++': return <Plus className="h-5 w-5 text-white" />;
        case 'TypeScript': return <Type className="h-5 w-5 text-white" />;
        default: return <Code className="h-5 w-5 text-white" />;
    }
};

const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
        case 'beginner': return <SignalLow className="h-5 w-5 text-hacker-green" />;
        case 'intermediate': return <SignalMedium className="h-5 w-5 text-hacker-green" />;
        case 'advanced': return <SignalHigh className="h-5 w-5 text-hacker-green" />;
        default: return null;
    }
};

export const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  return (
    <div className="bg-black border border-white rounded-lg p-4 hover:border-hacker-green transition-all duration-200 cursor-pointer group flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getLanguageIcon(mission.language)}
        </div>
        <div className="flex items-center space-x-2">
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
        <Link to={`/mission/${mission.id}`} className="bg-hacker-green text-black p-2 rounded-full hover:bg-opacity-80 transition-colors">
          <Play className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};