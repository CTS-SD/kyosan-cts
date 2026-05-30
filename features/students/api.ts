import type { StudentValues } from "@/features/students/editor";
import { api } from "@/lib/api-client";

export async function insertStudents(values: StudentValues[]) {
  const res = await api.students.$post({ json: values });
  if (!res.ok) {
    throw new Error("学生の追加に失敗しました");
  }
  return res.json();
}

export async function updateStudent(id: number, values: StudentValues) {
  const res = await api.students[":id"].$put({ param: { id: String(id) }, json: values });
  if (!res.ok) {
    throw new Error("学生の更新に失敗しました");
  }
  return res.json();
}

export async function deleteStudent(id: number) {
  const res = await api.students[":id"].$delete({ param: { id: String(id) } });
  if (!res.ok) {
    throw new Error("学生の削除に失敗しました");
  }
  return res.json();
}

export async function existsStudentByStudentNumber(studentNumber: string) {
  const res = await api.students.exists.$get({ query: { studentNumber } });
  if (!res.ok) {
    throw new Error("学籍番号の確認に失敗しました");
  }
  const { exists } = await res.json();
  return exists;
}
