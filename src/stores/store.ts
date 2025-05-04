import { create } from "zustand";

interface StoreState {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (expanded: boolean) => void;
  toggleSidebarExpanded: () => void;
}

export const useStore = create<StoreState>((set) => ({
  isSidebarExpanded: false,
  setIsSidebarExpanded: (expanded) => set({ isSidebarExpanded: expanded }),

  toggleSidebarExpanded: () => {
    set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded }));
  },
}));
