import { z } from "zod";

export const DepartmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  order: z.number(),
});

export type Department = z.infer<typeof DepartmentSchema>;
