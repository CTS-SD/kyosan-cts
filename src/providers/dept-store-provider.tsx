"use client";

import { createDeptStore, DeptState, DeptStore } from "@/stores/dept-store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

type DeptStoreApi = ReturnType<typeof createDeptStore>;

export const DeptStoreContext = createContext<DeptStoreApi | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
  initialState?: DeptState;
};

export const DeptStoreProvider = ({ children, initialState }: Props) => {
  const storeRef = useRef<DeptStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createDeptStore(initialState);
  }

  return (
    <DeptStoreContext.Provider value={storeRef.current}>
      {children}
    </DeptStoreContext.Provider>
  );
};

export const useDeptStore = <T,>(selector: (store: DeptStore) => T): T => {
  const context = useContext(DeptStoreContext);

  if (!context) {
    throw new Error("useDeptStore must be used within a DeptStoreProvider");
  }

  return useStore(context, selector);
};
