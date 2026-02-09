"use client";

import { create } from "zustand";

export type ConfirmOptions = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

type ConfirmRequest = {
  id: string;
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
};

type ConfirmState = {
  queue: ConfirmRequest[];
  enqueue: (req: ConfirmRequest) => void;
  resolveActive: (value: boolean) => void;
  clear: () => void;
};

function randomId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  queue: [],

  enqueue: (req) => set((s) => ({ queue: [...s.queue, req] })),

  resolveActive: (value) => {
    const active = get().queue[0];
    if (!active) return;

    // resolve first
    active.resolve(value);

    // pop the queue
    set((s) => ({ queue: s.queue.slice(1) }));
  },

  clear: () => set({ queue: [] }),
}));

/**
 * Call this from ANY client-side code to show a confirm dialog.
 */
export function confirm(options: ConfirmOptions): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    useConfirmStore.getState().enqueue({
      id: randomId(),
      options,
      resolve,
    });
  });
}
