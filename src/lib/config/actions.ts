"use server";

import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { cache } from "react";
import { db } from "@/lib/db";
import { ConfigTable } from "@/lib/db/schema";
import { type ConfigKey, type ConfigMap, type ConfigValue, configDefinitions } from "./definitions";

function buildDefaultConfig(): ConfigMap {
  const entries = Object.keys(configDefinitions).map((key) => {
    const typedKey = key as ConfigKey;
    const defaultValue = configDefinitions[typedKey].defaultValue as ConfigValue<typeof typedKey>;

    return [typedKey, defaultValue] as const;
  });

  return Object.fromEntries(entries) as ConfigMap;
}

export async function getConfigValue<K extends ConfigKey>(key: K): Promise<ConfigValue<K>> {
  const definition = configDefinitions[key];

  try {
    const [row] = await db.select().from(ConfigTable).where(eq(ConfigTable.key, key)).limit(1);

    if (row?.value !== undefined && row.value !== null) {
      const parsed = definition.schema.safeParse(row.value);

      if (parsed.success) {
        return parsed.data as ConfigValue<K>;
      }
    }
  } catch (error) {
    console.error("Failed to load config value", { key, error });
  }

  return definition.defaultValue as ConfigValue<K>;
}

export const getConfig = cache(async (): Promise<ConfigMap> => {
  try {
    const rows = await db.select().from(ConfigTable);

    const rowsByKey = new Map(rows.map((item) => [item.key, item.value]));
    const configEntries: Array<[ConfigKey, ConfigValue<ConfigKey>]> = [];

    for (const key of Object.keys(configDefinitions) as ConfigKey[]) {
      const definition = configDefinitions[key];
      const rawValue = rowsByKey.get(key);

      if (rawValue !== undefined && rawValue !== null) {
        const parsed = definition.schema.safeParse(rawValue);

        if (parsed.success) {
          configEntries.push([key, parsed.data as ConfigValue<typeof key>]);
          continue;
        }
      }

      configEntries.push([key, definition.defaultValue as ConfigValue<typeof key>]);
    }

    return Object.fromEntries(configEntries) as ConfigMap;
  } catch (error) {
    console.error("Failed to load config map", error);
    return buildDefaultConfig();
  }
});

export async function upsertConfigValue<K extends ConfigKey>(key: K, value: ConfigValue<K>): Promise<void> {
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

  revalidatePath("/");
}
