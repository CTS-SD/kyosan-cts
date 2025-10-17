'use server';

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { ConfigTable } from "@/lib/db/schema";
import {
  configDefinitions,
  ConfigKey,
  ConfigMap,
  ConfigValue,
} from "./definitions";

function buildDefaultConfig(): ConfigMap {
  const config = {} as ConfigMap;

  for (const key of Object.keys(configDefinitions) as ConfigKey[]) {
    config[key] = configDefinitions[key]
      .defaultValue as ConfigValue<typeof key>;
  }

  return config;
}

export async function getConfigValue<K extends ConfigKey>(
  key: K,
): Promise<ConfigValue<K>> {
  const definition = configDefinitions[key];

  try {
    const [row] = await db
      .select()
      .from(ConfigTable)
      .where(eq(ConfigTable.key, key))
      .limit(1);

    if (row?.value !== undefined && row.value !== null) {
      const parsed = definition.schema.safeParse(row.value);

      if (parsed.success) {
        return parsed.data as ConfigValue<K>;
      }
    }
  } catch (error) {
    console.error("Failed to load config value", { key, error });
  }

  return definition.defaultValue;
}

export async function getConfig(): Promise<ConfigMap> {
  try {
    const rows = await db.select().from(ConfigTable);

    const rowsByKey = new Map(rows.map((item) => [item.key, item.value]));
    const config = {} as ConfigMap;

    for (const key of Object.keys(configDefinitions) as ConfigKey[]) {
      const definition = configDefinitions[key];
      const rawValue = rowsByKey.get(key);

      if (rawValue !== undefined && rawValue !== null) {
        const parsed = definition.schema.safeParse(rawValue);

        if (parsed.success) {
          config[key] = parsed.data as ConfigValue<typeof key>;
          continue;
        }
      }

      config[key] = definition.defaultValue as ConfigValue<typeof key>;
    }

    return config;
  } catch (error) {
    console.error("Failed to load config map", error);
    return buildDefaultConfig();
  }
}

export async function upsertConfigValue<K extends ConfigKey>(
  key: K,
  value: ConfigValue<K>,
): Promise<void> {
  const definition = configDefinitions[key];
  const parsed = definition.schema.parse(value);

  await db
    .insert(ConfigTable)
    .values({ key, value: parsed })
    .onConflictDoUpdate({
      target: ConfigTable.key,
      set: { value: parsed },
    })
    .execute();
}
