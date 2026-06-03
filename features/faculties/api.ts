import type { FacultyValues } from "@/features/faculties/editor";
import { api } from "@/lib/api-client";

export async function insertFaculty(values: FacultyValues) {
  const res = await api.faculties.$post({ json: values });
  if (!res.ok) {
    throw new Error("学部の追加に失敗しました");
  }
  return res.json();
}

export async function updateFaculty(id: number, values: FacultyValues) {
  const res = await api.faculties[":id"].$put({ param: { id: String(id) }, json: values });
  if (!res.ok) {
    throw new Error("学部の更新に失敗しました");
  }
  return res.json();
}

export async function deleteFaculty(id: number) {
  const res = await api.faculties[":id"].$delete({ param: { id: String(id) } });
  if (!res.ok) {
    throw new Error("学部の削除に失敗しました");
  }
  return res.json();
}
