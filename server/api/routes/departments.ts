import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { DepartmentEditorSchema } from "@/features/departments/editor";
import {
  deleteDepartment,
  insertDepartment,
  reorderDepartments,
  updateDepartment,
} from "@/server/services/departments";
import { type AuthVariables, requireAdmin } from "../middleware";

const idParam = z.object({ id: z.coerce.number().int().positive() });
const reorderBody = z.object({ ids: z.array(z.number().int().positive()) });

/** Postgres unique_violation — raised when the department name is already taken. */
const isUniqueViolation = (e: unknown) => typeof e === "object" && e !== null && "code" in e && e.code === "23505";

export const departmentsRoute = new Hono<{ Variables: AuthVariables }>()
  .post("/", requireAdmin, zValidator("json", DepartmentEditorSchema), async (c) => {
    try {
      const department = await insertDepartment(c.req.valid("json"));
      return c.json(department, 201);
    } catch (e) {
      if (isUniqueViolation(e)) return c.json({ error: "同じ名前の部署が既に存在します" }, 409);
      throw e;
    }
  })
  .post("/reorder", requireAdmin, zValidator("json", reorderBody), async (c) => {
    await reorderDepartments(c.req.valid("json").ids);
    return c.json({ ok: true });
  })
  .put("/:id", requireAdmin, zValidator("param", idParam), zValidator("json", DepartmentEditorSchema), async (c) => {
    const { id } = c.req.valid("param");
    try {
      const department = await updateDepartment(id, c.req.valid("json"));
      if (!department) {
        return c.json({ error: "Not Found" }, 404);
      }
      return c.json(department);
    } catch (e) {
      if (isUniqueViolation(e)) return c.json({ error: "同じ名前の部署が既に存在します" }, 409);
      throw e;
    }
  })
  .delete("/:id", requireAdmin, zValidator("param", idParam), async (c) => {
    const { id } = c.req.valid("param");
    await deleteDepartment(id);
    return c.json({ id });
  });
