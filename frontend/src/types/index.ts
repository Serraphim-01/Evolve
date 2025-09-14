export interface User {
  id: string;
  username: string;
  email: string;
  level: number;
  xp: number;
  avatar: string;
  joinDate: string;
  completedMissions: number;
  createdMissions: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  createdBy: string;
  completions: number;
  createdAt: string;
  type: 'timed' | 'one-time' | 'normal';
  mode: 'pvp' | 'pvsai' | 'normal';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
  avatar: string;
}