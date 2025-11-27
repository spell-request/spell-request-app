import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/profile.ts';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

// Mock user for development
const MOCK_USER: User = {
  id: 'user-001',
  email: 'wizard@grimoire.dev',
  username: 'arcane_coder',
  avatar_url: undefined,
  created_at: '2025-01-15T00:00:00Z',
  updated_at: '2025-11-27T00:00:00Z',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock validation
          if (email && password.length >= 6) {
            set({
              user: { ...MOCK_USER, email },
              accessToken: 'mock-jwt-token-' + Date.now(),
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Login failed';
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw err;
        }
      },

      register: async (email: string, username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock validation
          if (email && username && password.length >= 6) {
            const newUser: User = {
              ...MOCK_USER,
              id: 'user-' + Date.now(),
              email,
              username,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };

            set({
              user: newUser,
              accessToken: 'mock-jwt-token-' + Date.now(),
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            throw new Error('Invalid registration data');
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Registration failed';
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw err;
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),

      setUser: (user: User) => set({ user }),

      setToken: (token: string) => set({ accessToken: token }),
    }),
    {
      name: 'grimoire-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
