export type UserRank =
  | 'novice'
  | 'apprentice'
  | 'acolyte'
  | 'adept'
  | 'mage'
  | 'wizard'
  | 'archmage';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  user_id: string;
  username: string;
  avatar_url?: string;
  rank: UserRank;
  xp: number;
  xp_to_next_rank: number;
  current_streak: number;
  longest_streak: number;
  total_missions_completed: number;
  total_books_completed: number;
  total_time_spent: number; // in minutes
  total_tests_passed: number;
  badges: Badge[];
  member_since: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned_at: string;
  category: 'achievement' | 'milestone' | 'special';
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  avatar_url?: string;
  user_rank: UserRank;
  xp: number;
  missions_completed: number;
  current_streak: number;
}

export interface UserStats {
  daily_xp: number;
  weekly_xp: number;
  monthly_xp: number;
  missions_this_week: number;
  avg_mission_time: number;
  favorite_book?: string;
}

export const RANK_XP_THRESHOLDS: Record<UserRank, number> = {
  novice: 0,
  apprentice: 100,
  acolyte: 500,
  adept: 1500,
  mage: 3500,
  wizard: 7000,
  archmage: 15000,
};

export const RANK_DISPLAY_NAMES: Record<UserRank, string> = {
  novice: 'Novice',
  apprentice: 'Apprentice',
  acolyte: 'Acolyte',
  adept: 'Adept',
  mage: 'Mage',
  wizard: 'Wizard',
  archmage: 'Archmage',
};
