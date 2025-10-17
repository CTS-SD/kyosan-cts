import { db } from "@/lib/db";
import { DepartmentTable, FacultyTable, StudentTable } from "@/lib/db/schema";
import { DeptStoreProvider } from "@/providers/dept-store-provider";
import ClientView from "./client-view";
import { ConfigProvider } from "@/providers/config-provider";
import { getConfig } from "@/lib/config/actions";

const Page = async () => {
  const departments = await db.select().from(DepartmentTable);
  const faculties = await db.select().from(FacultyTable);
  const students = await db.select().from(StudentTable);

  const config = await getConfig();

  return (
    <ConfigProvider value={config}>
      <DeptStoreProvider initialState={{ departments, faculties, students }}>
        <ClientView />
      </DeptStoreProvider>
    </ConfigProvider>
  );
};

export default Page;
