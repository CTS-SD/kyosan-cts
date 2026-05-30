import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { StudentEditorSchema } from "@/features/students/editor";
import {
  deleteStudent,
  existsStudentByStudentNumber,
  getStudentOptions,
  getStudents,
  insertStudents,
  updateStudent,
} from "@/server/services/students";
import { type AuthVariables, requireAdmin, requireAuth } from "../middleware";

const idParam = z.object({ id: z.coerce.number().int().positive() });

export const studentsRoute = new Hono<{ Variables: AuthVariables }>()
  .get("/", requireAdmin, async (c) => {
    return c.json(await getStudents());
  })
  .get("/options", requireAdmin, async (c) => {
    return c.json(await getStudentOptions());
  })
  // Available to any authenticated user (the member-facing department lookup).
  .get("/exists", requireAuth, zValidator("query", z.object({ studentNumber: z.string() })), async (c) => {
    const { studentNumber } = c.req.valid("query");
    return c.json({ exists: await existsStudentByStudentNumber(studentNumber) });
  })
  .post("/", requireAdmin, zValidator("json", z.array(StudentEditorSchema)), async (c) => {
    const students = await insertStudents(c.req.valid("json"));
    return c.json(students, 201);
  })
  .put("/:id", requireAdmin, zValidator("param", idParam), zValidator("json", StudentEditorSchema), async (c) => {
    const { id } = c.req.valid("param");
    const student = await updateStudent(id, c.req.valid("json"));
    if (!student) {
      return c.json({ error: "Not Found" }, 404);
    }
    return c.json(student);
  })
  .delete("/:id", requireAdmin, zValidator("param", idParam), async (c) => {
    const { id } = c.req.valid("param");
    await deleteStudent(id);
    return c.json({ id });
  });
