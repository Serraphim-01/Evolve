import React from 'react';
import { Link } from 'react-router-dom';
import { Mission } from '../../types';
import { X } from 'lucide-react';

interface MissionInfoModalProps {
  mission: Mission;
  onClose: () => void;
}

export const MissionInfoModal: React.FC<MissionInfoModalProps> = ({ mission, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-black border border-hacker-green rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-white">{mission.title}</h2>
          <button onClick={onClose} className="text-white hover:text-hacker-green">
            <X className="h-6 w-6" />
          </button>
        </div>
        <p className="text-white mb-4">{mission.description}</p>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-white"><span className="font-semibold">XP Reward:</span> {mission.xpReward}</p>
            <p className="text-white"><span className="font-semibold">Created by:</span> {mission.createdBy}</p>
          </div>
          <div>
            <p className="text-white"><span className="font-semibold">Completions:</span> {mission.completions}</p>
            <p className="text-white"><span className="font-semibold">Type:</span> {mission.type}</p>
          </div>
        </div>
        <Link
          to={`/mission/${mission.id}`}
          className="w-full bg-hacker-green text-black py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors flex items-center justify-center"
        >
          Solve Challenge
        </Link>
      </div>
    </div>
  );
};
