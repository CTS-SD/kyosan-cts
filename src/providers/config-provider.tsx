"use client";

import { ConfigKey, ConfigMap, ConfigValue } from "@/lib/config/definitions";
import { createContext, type ReactNode, useContext, useState } from "react";

const ConfigContext = createContext<ConfigMap | undefined>(undefined);

type ConfigProviderProps = {
  value: ConfigMap;
  children: ReactNode;
};

export const ConfigProvider = ({ value, children }: ConfigProviderProps) => (
  <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
);

export function useConfig<K extends ConfigKey>(key: K) {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  const [value, setValue] = useState(context[key]);

  return [value, setValue] as [
    ConfigValue<K>,
    React.Dispatch<React.SetStateAction<ConfigValue<K>>>,
  ];
}
