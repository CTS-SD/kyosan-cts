import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { FacultyEditorSchema } from "@/features/faculties/editor";
import { deleteFaculty, insertFaculty, updateFaculty } from "@/server/services/faculties";
import { type AuthVariables, requireAdmin } from "../middleware";

const idParam = z.object({ id: z.coerce.number().int().positive() });

/** Postgres unique_violation — raised when the faculty name is already taken. */
const isUniqueViolation = (e: unknown) => typeof e === "object" && e !== null && "code" in e && e.code === "23505";

export const facultiesRoute = new Hono<{ Variables: AuthVariables }>()
  .post("/", requireAdmin, zValidator("json", FacultyEditorSchema), async (c) => {
    try {
      const faculty = await insertFaculty(c.req.valid("json"));
      return c.json(faculty, 201);
    } catch (e) {
      if (isUniqueViolation(e)) return c.json({ error: "同じ名前の学部が既に存在します" }, 409);
      throw e;
    }
  })
  .put("/:id", requireAdmin, zValidator("param", idParam), zValidator("json", FacultyEditorSchema), async (c) => {
    const { id } = c.req.valid("param");
    try {
      const faculty = await updateFaculty(id, c.req.valid("json"));
      if (!faculty) {
        return c.json({ error: "Not Found" }, 404);
      }
      return c.json(faculty);
    } catch (e) {
      if (isUniqueViolation(e)) return c.json({ error: "同じ名前の学部が既に存在します" }, 409);
      throw e;
    }
  })
  .delete("/:id", requireAdmin, zValidator("param", idParam), async (c) => {
    const { id } = c.req.valid("param");
    await deleteFaculty(id);
    return c.json({ id });
  });
