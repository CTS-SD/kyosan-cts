import { db } from "..";
import {
  DepartmentTable,
  FacultyTable,
  QuizTable,
  StudentTable,
  TextQuizTable,
} from "../schema";

main();

async function main() {
  await db
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
    .onConflictDoNothing();

  await db
    .insert(DepartmentTable)
    .values([
      { name: "総務部署" },
      { name: "レク部署" },
      { name: "SD部署" },
      { name: "開発部署" },
      { name: "広報部署" },
    ])
    .onConflictDoNothing();

  const [q] = await db
    .insert(QuizTable)
    .values([
      {
        id: 1,
        type: "text",
        question: "これはテスト用問題です。正しい答えは「はい」です。",
        explanation: "これはテスト用問題の解説です。",
        isPublished: true,
      },
    ])
    .onConflictDoNothing()
    .returning({ id: QuizTable.id });
  await db.insert(TextQuizTable).values([
    {
      quizId: q.id,
      answer: "はい",
    },
  ]);

  await db
    .insert(StudentTable)
    .values([
      {
        name: "テスト 太郎",
        studentNumber: "000000",
        facultyId: 1,
        departmentId: 1,
      },
    ])
    .onConflictDoNothing();
}
