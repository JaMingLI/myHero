import { create } from "zustand";
import { createUiSlice, type UiSlice } from "./slices/ui.slice";
import { createAuthSlice, type AuthSlice } from "./slices/auth.slice";

// Combined store type
type AppStore = UiSlice & AuthSlice;

/**
 * Root Store
 * Combines all slices into a single store
 */
export const useAppStore = create<AppStore>()((...a) => ({
  ...createUiSlice(...a),
  ...createAuthSlice(...a),
}));
