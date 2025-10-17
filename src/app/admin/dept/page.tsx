import { db } from "@/lib/db";
import { DepartmentTable, FacultyTable, StudentTable } from "@/lib/db/schema";
import { DeptStoreProvider } from "@/providers/dept-store-provider";
import ClientView from "./client-view";

const Page = async () => {
  const departments = await db.select().from(DepartmentTable);
  const faculties = await db.select().from(FacultyTable);
  const students = await db.select().from(StudentTable);

  return (
    <DeptStoreProvider initialState={{ departments, faculties, students }}>
      <ClientView />
    </DeptStoreProvider>
  );
};

export default Page;
