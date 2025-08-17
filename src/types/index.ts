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
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  createdBy: string;
  completions: number;
  tags: string[];
  createdAt: string;
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