import { z } from "zod";

type ConfigDefinition<TSchema extends z.ZodTypeAny> = {
  schema: TSchema;
  defaultValue: z.infer<TSchema>;
};

function createDefinition<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  defaultValue: z.infer<TSchema>,
): ConfigDefinition<TSchema> {
  return { schema, defaultValue };
}

export const configDefinitions = {
  departmentAnnouncementsPublished: createDefinition(z.boolean(), false),
  departmentAnnouncementsYear: createDefinition(z.number(), 2000),
  purattoTestQuestionCount: createDefinition(z.number(), 5),
};

export type ConfigKey = keyof typeof configDefinitions;
export type ConfigSchema<K extends ConfigKey> = (typeof configDefinitions)[K]["schema"];
export type ConfigValue<K extends ConfigKey> = z.infer<ConfigSchema<K>>;
export type ConfigMap = {
  [K in ConfigKey]: ConfigValue<K>;
};
