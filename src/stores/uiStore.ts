import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ReactNode } from 'react';

export type SceneType = 'intro' | 'mission' | 'profile' | 'books';
export type ThemeType = 'classic' | 'amber' | 'white';

interface UIState {
  // Scene management
  currentScene: SceneType;

  // Modal state
  isModalOpen: boolean;
  modalContent: ReactNode | null;

  // Theme
  theme: ThemeType;

  // Sound
  soundEnabled: boolean;

  // Sidebar
  isSidebarOpen: boolean;

  // Loading states
  isSceneTransitioning: boolean;

  // Actions
  setScene: (scene: SceneType) => void;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  setTheme: (theme: ThemeType) => void;
  toggleSound: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSceneTransitioning: (transitioning: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      currentScene: 'intro',
      isModalOpen: false,
      modalContent: null,
      theme: 'classic',
      soundEnabled: true,
      isSidebarOpen: false,
      isSceneTransitioning: false,

      setScene: (scene) => {
        set({ isSceneTransitioning: true });
        // Simulate transition delay
        setTimeout(() => {
          set({ currentScene: scene, isSceneTransitioning: false });
        }, 300);
      },

      openModal: (content) => set({ isModalOpen: true, modalContent: content }),

      closeModal: () => set({ isModalOpen: false, modalContent: null }),

      setTheme: (theme) => {
        // Apply theme class to document
        document.documentElement.classList.remove('theme-classic', 'theme-amber', 'theme-white');
        if (theme !== 'classic') {
          document.documentElement.classList.add(`theme-${theme}`);
        }
        set({ theme });
      },

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      setSidebarOpen: (open) => set({ isSidebarOpen: open }),

      setSceneTransitioning: (transitioning) => set({ isSceneTransitioning: transitioning }),
    }),
    {
      name: 'grimoire-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        soundEnabled: state.soundEnabled,
      }),
      onRehydrateStorage: () => (state) => {
        // Apply saved theme on load
        if (state?.theme && state.theme !== 'classic') {
          document.documentElement.classList.add(`theme-${state.theme}`);
        }
      },
    }
  )
);
