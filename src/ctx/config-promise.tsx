"use client";

import { createContext, useContext } from "react";
import type { ConfigMap } from "@/lib/config/definitions";

const ConfigPromiseContext = createContext<Promise<ConfigMap> | null>(null);

export const useConfigPromise = () => {
  const value = useContext(ConfigPromiseContext);
  if (!value) throw new Error("useConfigPromise must be used within a ConfigPromiseProvider");
  return value;
};

export const ConfigPromiseProvider = (props: React.ComponentProps<typeof ConfigPromiseContext.Provider>) => {
  return <ConfigPromiseContext.Provider {...props} />;
};
