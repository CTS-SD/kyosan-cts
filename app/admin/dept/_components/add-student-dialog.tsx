"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { insertStudents } from "@/features/students/api";
import { useDeptRefs } from "./dept-refs-context";
import { StudentEditor, type StudentEditorContextValue, type StudentEditorProviderProps } from "./student-editor";

export const AddStudentDialogContent = ({ defaultValues }: Pick<StudentEditorProviderProps, "defaultValues">) => {
  const router = useRouter();
  const { faculties, departments } = useDeptRefs();

  const handleAdd: StudentEditorContextValue["actions"]["submit"] = async ({ values, form }) => {
    try {
      await insertStudents([values]);
      toast.success("学生を追加しました");
      form.reset({
        ...values,
        name: "",
        studentNumber: "",
      });
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "学生の追加に失敗しました");
    }
  };

  return (
    <DialogContent>
      <DialogTitle className="sr-only">学生を追加</DialogTitle>
      <DialogDescription className="sr-only">配属部署発表で表示する学生を追加</DialogDescription>
      <StudentEditor.Provider
        departments={departments}
        faculties={faculties}
        actions={{
          submit: handleAdd,
        }}
        defaultValues={defaultValues}
      >
        <StudentEditor.Frame>
          <StudentEditor.FieldSet>
            <StudentEditor.Hero>
              <StudentEditor.Avatar />
              <StudentEditor.Field.Name />
            </StudentEditor.Hero>
            <div>
              <StudentEditor.Field.StudentNumber />
              <StudentEditor.Field.Faculty />
              <StudentEditor.Field.Department />
            </div>
          </StudentEditor.FieldSet>
          <DialogFooter>
            <DialogClose asChild>
              <StudentEditor.Cancel />
            </DialogClose>
            <StudentEditor.Submit>追加</StudentEditor.Submit>
          </DialogFooter>
        </StudentEditor.Frame>
      </StudentEditor.Provider>
    </DialogContent>
  );
};
