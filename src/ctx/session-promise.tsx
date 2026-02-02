"use client";

import { createContext, useContext } from "react";
import type { GetSessionReturn } from "@/lib/auth/types";

const SessionPromiseContext = createContext<Promise<GetSessionReturn> | null>(null);

export const useSessionPromise = () => {
  const value = useContext(SessionPromiseContext);
  if (!value) throw new Error("useSessionPromise must be used within a SessionPromiseProvider");
  return value;
};

export const SessionPromiseProvider = (props: React.ComponentProps<typeof SessionPromiseContext.Provider>) => {
  return <SessionPromiseContext.Provider {...props} />;
};
