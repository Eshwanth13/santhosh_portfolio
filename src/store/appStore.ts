import { create } from 'zustand';

interface AppState {
  isLoaded: boolean;
  isMenuOpen: boolean;
  activeSection: string;
  loadingProgress: number;
  setIsLoaded: (val: boolean) => void;
  setIsMenuOpen: (val: boolean) => void;
  setActiveSection: (section: string) => void;
  setLoadingProgress: (val: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoaded: false,
  isMenuOpen: false,
  activeSection: 'hero',
  loadingProgress: 0,
  setIsLoaded: (val) => set({ isLoaded: val }),
  setIsMenuOpen: (val) => set({ isMenuOpen: val }),
  setActiveSection: (section) => set({ activeSection: section }),
  setLoadingProgress: (val) => set({ loadingProgress: val }),
}));
