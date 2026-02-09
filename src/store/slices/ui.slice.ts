import type { StateCreator } from "zustand";

export interface UiSlice {
  // State
  isSidebarOpen: boolean;
  isLoading: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  // Initial state
  isSidebarOpen: true,
  isLoading: false,

  // Actions
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
});
