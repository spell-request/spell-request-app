import type { User } from './profile.ts';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface XPUpdate {
  previous_xp: number;
  xp_earned: number;
  new_xp: number;
  rank_up: boolean;
  previous_rank?: string;
  new_rank?: string;
  badges_earned?: string[];
}

export interface WebSocketMessage {
  type: 'test_result' | 'progress' | 'notification' | 'error';
  payload: unknown;
  timestamp: string;
}

export interface TestProgressMessage {
  mission_id: string;
  test_name: string;
  status: 'running' | 'passed' | 'failed' | 'skipped';
  output?: string;
  error?: string;
}
