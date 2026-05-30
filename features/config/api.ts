import { api } from "@/lib/api-client";
import type { ConfigKey, ConfigValue } from "./definitions";

/** Persist a single config value via the API (admin only). */
export async function upsertConfigValue<K extends ConfigKey>(key: K, value: ConfigValue<K>): Promise<void> {
  const res = await api.config.$put({ json: { key, value } });
  if (!res.ok) {
    throw new Error("Failed to save config value");
  }
}
