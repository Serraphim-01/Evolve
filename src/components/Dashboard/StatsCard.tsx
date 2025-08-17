import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-black rounded-lg p-6 border border-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-lg bg-black`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );
};