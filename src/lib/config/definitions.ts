import { z } from "zod";

type ConfigDefinition<TSchema extends z.ZodTypeAny> = {
  schema: TSchema;
  defaultValue: z.infer<TSchema>;
};

function defineConfig<T extends Record<string, ConfigDefinition<z.ZodTypeAny>>>(
  obj: T,
) {
  return obj as {
    [K in keyof T]: ConfigDefinition<T[K]["schema"]> & {
      defaultValue: T[K]["defaultValue"];
    };
  };
}

export const configDefinitions = defineConfig({
  departmentAnnouncementsPublished: {
    schema: z.boolean(),
    defaultValue: false,
  },
});

export type ConfigKey = keyof typeof configDefinitions;
export type ConfigSchema<K extends ConfigKey> =
  (typeof configDefinitions)[K]["schema"];
export type ConfigValue<K extends ConfigKey> = z.infer<ConfigSchema<K>>;
export type ConfigMap = {
  [K in ConfigKey]: ConfigValue<K>;
};
