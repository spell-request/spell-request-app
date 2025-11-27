export type BookDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type BookStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  difficulty: BookDifficulty;
  status: BookStatus;
  cover_image?: string;
  total_missions: number;
  completed_missions: number;
  xp_reward: number;
  estimated_hours: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface BookProgress {
  book_id: string;
  user_id: string;
  status: BookStatus;
  progress_percentage: number;
  completed_missions: number;
  total_xp_earned: number;
  started_at: string;
  completed_at?: string;
  last_activity_at: string;
}

export interface BookChapter {
  id: string;
  book_id: string;
  title: string;
  description: string;
  order: number;
  missions: string[];
}
