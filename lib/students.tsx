import { unstable_cache } from "next/cache";
import { db } from "./db";
import { DepartmentTable, FacultyTable, StudentTable } from "./db/schema";

export const getStudents = unstable_cache(() => db.select().from(StudentTable), ["students"], { tags: ["students"] });

export const getDepartments = unstable_cache(() => db.select().from(DepartmentTable), ["departments"], {
  tags: ["departments"],
});

export const getFaculties = unstable_cache(() => db.select().from(FacultyTable), ["faculties"], {
  tags: ["faculties"],
});
