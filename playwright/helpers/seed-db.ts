import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  DepartmentTable,
  FacultyTable,
  QuizTable,
  SelectQuizTable,
  StudentTable,
  user as UserTable,
} from "@/lib/db/schema";
import { env } from "@/lib/env";
import { assertTestEnv } from "./assert";
import { authTest } from "./auth-test";

export async function seedDb() {
  assertTestEnv();

  // Create test user using test auth instance
  const { user } = await authTest.api.signUpEmail({
    body: {
      name: "Test User",
      email: env.TEST_USER_EMAIL,
      password: env.TEST_USER_PASSWORD,
    },
  });
  await db.update(UserTable).set({ role: "admin" }).where(eq(UserTable.id, user.id));

  // Seed Faculties
  const faculties = await db
    .insert(FacultyTable)
    .values([
      { name: "法学部" },
      { name: "現代社会学部" },
      { name: "国際関係学部" },
      { name: "外国語学部" },
      { name: "文化学部" },
      { name: "理学部" },
      { name: "情報理工学部" },
      { name: "生命科学部" },
      { name: "アントレプレナーシップ学部" },
      { name: "経済学部" },
      { name: "経営学部" },
    ])
    .returning({ id: FacultyTable.id });

  // Seed Departments
  const departments = await db
    .insert(DepartmentTable)
    .values([
      { name: "総務部署" },
      { name: "レク部署" },
      { name: "SD部署" },
      { name: "開発部署" },
      { name: "広報部署" },
    ])
    .returning({ id: DepartmentTable.id });

  // Seed Students
  await db.insert(StudentTable).values(
    departments.flatMap((dept, index) => [
      {
        name: "田中太郎",
        departmentId: dept.id,
        facultyId: faculties[0].id,
        studentNumber: `${100000 + index * 10}`,
      },
      {
        name: "佐藤花子",
        departmentId: dept.id,
        facultyId: faculties[1].id,
        studentNumber: `${100001 + index * 10}`,
      },
    ])
  );

  // Seed Quizzes
  const quizIds = await db
    .insert(QuizTable)
    .values([
      {
        type: "select",
        question: "1+1は？",
        explanation: "1+1は2です。",
      },
      {
        type: "select",
        question: "次のうち、果物はどれですか？",
        explanation: "りんごは果物です。",
      },
    ])
    .returning({ id: QuizTable.id });

  await db.insert(SelectQuizTable).values([
    {
      quizId: quizIds[0].id,
      correctChoices: ["2"],
      incorrectChoices: ["1", "3", "4"],
    },
    {
      quizId: quizIds[1].id,
      correctChoices: ["りんご"],
      incorrectChoices: ["にんじん", "じゃがいも", "ピーマン"],
    },
  ]);
}
