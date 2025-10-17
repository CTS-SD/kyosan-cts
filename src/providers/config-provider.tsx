"use client";

import { ConfigKey, ConfigMap, ConfigValue } from "@/lib/config/definitions";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useStore } from "zustand";
import {
  ConfigStore,
  ConfigStoreState,
  createConfigStore,
} from "@/stores/config-store";

const ConfigStoreContext = createContext<ConfigStore | null>(null);

type ConfigProviderProps = {
  value: ConfigMap;
  children: ReactNode;
};

export const ConfigProvider = ({ value, children }: ConfigProviderProps) => {
  const storeRef = useRef<ConfigStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createConfigStore(value);
  } else {
    const store = storeRef.current;
    const currentValues = store.getState().values;

    if (currentValues !== value) {
      store.setState({ values: value });
    }
  }

  return (
    <ConfigStoreContext.Provider value={storeRef.current}>
      {children}
    </ConfigStoreContext.Provider>
  );
};

function useConfigStore<T>(selector: (state: ConfigStoreState) => T): T {
  const store = useContext(ConfigStoreContext);

  if (!store) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  return useStore(store, selector);
}

export function useConfig<K extends ConfigKey>(
  key: K,
): [ConfigValue<K>, Dispatch<SetStateAction<ConfigValue<K>>>] {
  const value = useConfigStore((state) => state.values[key] as ConfigValue<K>);
  const setValueInStore = useConfigStore((state) => state.setValue);

  const setValue = useCallback<Dispatch<SetStateAction<ConfigValue<K>>>>(
    (updater) => {
      setValueInStore(key, updater);
    },
    [key, setValueInStore],
  );

  return [value, setValue];
}
