import { create } from "zustand";

type AdminSidebarStore = {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  toggle: () => void;
};

export const useAdminSidebar = create<AdminSidebarStore>((set) => ({
  open: false,
  setOpen: (next) =>
    set((state) => ({
      open: typeof next === "function" ? next(state.open) : next,
    })),
  toggle: () => set((state) => ({ open: !state.open })),
}));
