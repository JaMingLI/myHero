import type { StateCreator } from "zustand";

export interface AuthSlice {
  // State
  isAuthenticated: boolean;
  userId: string | null;

  // Actions
  login: (userId: string) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  // Initial state
  isAuthenticated: false,
  userId: null,

  // Actions
  login: (userId) => set({ isAuthenticated: true, userId }),
  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false, userId: null });
  },
});
