export type MissionStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export type MissionDifficulty = 1 | 2 | 3 | 4 | 5;

export interface Mission {
  id: string;
  book_id: string;
  title: string;
  description: string;
  lore: string;
  difficulty: MissionDifficulty;
  status: MissionStatus;
  xp_reward: number;
  tasks_count: number;
  order: number;
  prerequisites: string[];
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  mission_id: string;
  description: string;
  test_name: string;
  order: number;
  completed: boolean;
}

export interface Hint {
  id: string;
  mission_id: string;
  level: number;
  content: string;
  xp_penalty: number;
}

export interface Attempt {
  id: string;
  mission_id: string;
  user_id: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  hints_used: number;
  started_at: string;
  completed_at?: string;
  xp_earned?: number;
  message?: string;
}

export interface TestResult {
  passed: boolean;
  total: number;
  passed_count: number;
  failed_count: number;
  skipped_count: number;
  duration: number;
  test_cases: TestCase[];
}

export interface TestCase {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error_message?: string;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
  timestamp?: Date;
}
