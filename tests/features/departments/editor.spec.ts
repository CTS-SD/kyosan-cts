import { describe, expect, it } from "vitest";
import { DepartmentEditorSchema } from "@/features/departments/editor";

describe("DepartmentEditorSchema", () => {
  const base = { name: "総務部署", color: "#3b82f6" };

  it("accepts valid input and trims the name", () => {
    const result = DepartmentEditorSchema.safeParse({ ...base, name: "  総務部署  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("総務部署");
  });

  it("requires a non-empty name", () => {
    expect(DepartmentEditorSchema.safeParse({ ...base, name: "   " }).success).toBe(false);
  });

  it("accepts a 6-digit hex color (any case)", () => {
    expect(DepartmentEditorSchema.safeParse({ ...base, color: "#FF00aa" }).success).toBe(true);
  });

  it("rejects malformed hex colors", () => {
    expect(DepartmentEditorSchema.safeParse({ ...base, color: "3b82f6" }).success).toBe(false);
    expect(DepartmentEditorSchema.safeParse({ ...base, color: "#fff" }).success).toBe(false);
    expect(DepartmentEditorSchema.safeParse({ ...base, color: "#zzzzzz" }).success).toBe(false);
  });
});
