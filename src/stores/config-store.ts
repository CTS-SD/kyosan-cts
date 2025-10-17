import { ConfigKey, ConfigMap, ConfigValue } from "@/lib/config/definitions";
import { createStore, StoreApi } from "zustand";

type ConfigUpdater<K extends ConfigKey> =
  | ConfigValue<K>
  | ((prev: ConfigValue<K>) => ConfigValue<K>);

export type ConfigStoreState = {
  values: ConfigMap;
  setValue: <K extends ConfigKey>(key: K, updater: ConfigUpdater<K>) => void;
};

export type ConfigStore = StoreApi<ConfigStoreState>;

export const createConfigStore = (initialValues: ConfigMap): ConfigStore =>
  createStore<ConfigStoreState>((set, get) => ({
    values: initialValues,
    setValue: (key, updater) => {
      const previous = get().values[key] as ConfigValue<typeof key>;
      const nextValue =
        typeof updater === "function"
          ? (updater as (prev: ConfigValue<typeof key>) => ConfigValue<typeof key>)(previous)
          : updater;

      set((state) => ({
        values: {
          ...state.values,
          [key]: nextValue,
        },
      }));
    },
  }));
