import { z } from "zod";
import { DepartmentSchema } from "@/features/departments/types";

export type { Department } from "@/features/departments/types";
export { DepartmentSchema };

export const FacultySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const StudentSchema = z.object({
  id: z.number(),
  studentNumber: z.string(),
  name: z.string(),
  departmentId: z.number(),
  facultyId: z.number(),
});

/** A student with its resolved department/faculty relations. */
export const StudentWithRelationsSchema = StudentSchema.extend({
  department: DepartmentSchema.nullable(),
  faculty: FacultySchema.nullable(),
});

export type Faculty = z.infer<typeof FacultySchema>;
export type Student = z.infer<typeof StudentSchema>;
export type StudentWithRelations = z.infer<typeof StudentWithRelationsSchema>;

/** Map of department or faculty id → number of students assigned to it. */
export type StudentCountById = Record<number, number>;
