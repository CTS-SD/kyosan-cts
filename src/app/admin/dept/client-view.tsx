"use client";

import { DepartmentBox } from "@/components/admin/dept/department-box";
import { StudentDialog } from "@/components/admin/dept/student-dialog";
import { Button } from "@/components/ui/button";
import { insertStudents } from "@/lib/student-actions";
import { StudentValues } from "@/lib/student-editor";
import { useDeptStore } from "@/providers/dept-store-provider";
import { PlusIcon, UserPlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ClientView = () => {
  const { students, departments, addStudents, removeStudent } = useDeptStore(
    (store) => store
  );
  const [openStudentDialog, setOpenStudentDialog] = useState(false);

  const handleAddStudent = async (studentData: StudentValues) => {
    const insertResult = await insertStudents([studentData]);
    if (!insertResult.success) {
      toast.error(insertResult.message);
      return;
    }
    addStudents(insertResult.data);
    toast.success(insertResult.message);
    setOpenStudentDialog(false);
    return true;
  };

  const handleRemoveStudent = (id: number) => {
    removeStudent(id);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-end">
        <StudentDialog
          title="学生を追加"
          description="配属発表で表示する学生を追加します"
          onSubmit={handleAddStudent}
          open={openStudentDialog}
          setOpen={setOpenStudentDialog}
        >
          <Button>
            学生を追加
            <UserPlusIcon />
          </Button>
        </StudentDialog>
      </div>
      <div className="mt-4 gap-4 grid grid-cols-1 sm:grid-cols-2">
        {departments.map((department) => (
          <DepartmentBox
            key={department.id}
            department={department.name}
            students={students.filter(
              (student) => student.departmentId === department.id
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientView;
