import { describe, expect, it } from "vitest";
import { StudentEditorSchema, StudentNumberSchema } from "@/features/students/editor";

describe("StudentNumberSchema", () => {
  it("accepts a 6-digit number whose digit sum is divisible by 10", () => {
    // 1+1+1+1+1+5 = 10
    expect(StudentNumberSchema.safeParse("111115").success).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    const result = StudentNumberSchema.safeParse("  111115  ");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe("111115");
  });

  it("rejects non-6-digit input", () => {
    expect(StudentNumberSchema.safeParse("12345").success).toBe(false);
    expect(StudentNumberSchema.safeParse("1234567").success).toBe(false);
    expect(StudentNumberSchema.safeParse("12a45b").success).toBe(false);
  });

  it("rejects a failing checksum", () => {
    // 1+1+1+1+1+1 = 6
    expect(StudentNumberSchema.safeParse("111111").success).toBe(false);
  });
});

describe("StudentEditorSchema", () => {
  const base = { studentNumber: "111115", facultyId: 1, departmentId: 1 };

  it("accepts valid input and collapses repeated whitespace in the name", () => {
    const result = StudentEditorSchema.safeParse({ ...base, name: "山田　　太郎" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("山田 太郎");
  });

  it("accepts a name separated by ・", () => {
    expect(StudentEditorSchema.safeParse({ ...base, name: "山田・太郎" }).success).toBe(true);
  });

  it("rejects a name without a space or ・ separator", () => {
    expect(StudentEditorSchema.safeParse({ ...base, name: "山田太郎" }).success).toBe(false);
  });

  it("requires faculty and department to be selected", () => {
    expect(StudentEditorSchema.safeParse({ ...base, name: "山田 太郎", facultyId: 0 }).success).toBe(false);
    expect(StudentEditorSchema.safeParse({ ...base, name: "山田 太郎", departmentId: 0 }).success).toBe(false);
  });
});
