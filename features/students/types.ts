import { z } from "zod";

export const DepartmentSchema = z.object({
  id: z.number(),
  name: z.string(),
});

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

export type Department = z.infer<typeof DepartmentSchema>;
export type Faculty = z.infer<typeof FacultySchema>;
export type Student = z.infer<typeof StudentSchema>;
export type StudentWithRelations = z.infer<typeof StudentWithRelationsSchema>;
