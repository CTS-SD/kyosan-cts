import type { DepartmentValues } from "@/features/departments/editor";
import { api } from "@/lib/api-client";

export async function insertDepartment(values: DepartmentValues) {
  const res = await api.departments.$post({ json: values });
  if (!res.ok) {
    throw new Error("部署の追加に失敗しました");
  }
  return res.json();
}

export async function updateDepartment(id: number, values: DepartmentValues) {
  const res = await api.departments[":id"].$put({ param: { id: String(id) }, json: values });
  if (!res.ok) {
    throw new Error("部署の更新に失敗しました");
  }
  return res.json();
}

export async function deleteDepartment(id: number) {
  const res = await api.departments[":id"].$delete({ param: { id: String(id) } });
  if (!res.ok) {
    throw new Error("部署の削除に失敗しました");
  }
  return res.json();
}

export async function reorderDepartments(ids: number[]) {
  const res = await api.departments.reorder.$post({ json: { ids } });
  if (!res.ok) {
    throw new Error("並び順の保存に失敗しました");
  }
  return res.json();
}
