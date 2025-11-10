import { db } from "@/lib/db";
import {
  DepartmentTable,
  FacultyTable,
  QuizTable,
  SelectQuizTable,
  StudentTable,
  TextQuizTable,
  TrueFalseQuizTable,
} from "@/lib/db/schema";

const faculties = [
  "法学部",
  "現代社会学部",
  "国際関係学部",
  "外国語学部",
  "文化学部",
  "理学部",
  "情報理工学部",
  "生命科学部",
  "アントレプレナーシップ学部",
  "経済学部",
  "経営学部",
];

const departments = ["総務部署", "レク部署", "SD部署", "開発部署", "広報部署"];

export async function seed() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!dbUrl.endsWith("/test") && !dbUrl.endsWith("/dev")) {
    throw new Error(
      'DATABASE_URL must point to the "test" or "dev" database to prevent data loss',
    );
  }

  // Faculties
  await db.insert(FacultyTable).values(
    faculties.map((name) => ({
      name,
    })),
  );

  // Departments
  await db.insert(DepartmentTable).values(
    departments.map((name) => ({
      name,
    })),
  );

  // Students
  await db.insert(StudentTable).values([
    {
      name: "山田 太郎",
      facultyId: 1,
      departmentId: 1,
      studentNumber: "000000",
    },
  ]);

  // Quizzes
  const quizIds = await db
    .insert(QuizTable)
    .values([
      {
        type: "select",
        question: "1+1は？",
        explanation: "1+1は2です。",
      },
      {
        type: "text",
        question: "日本の首都は？",
        explanation: "日本の首都は東京です。",
      },
      {
        type: "true_false",
        question: "地球は平らである。",
        explanation: "地球は丸いです。",
      },
    ])
    .returning({ id: QuizTable.id });
  await db.insert(SelectQuizTable).values([
    {
      quizId: quizIds[0].id,
      correctChoices: ["2"],
      incorrectChoices: ["1", "3", "4"],
    },
  ]);
  await db
    .insert(TextQuizTable)
    .values([{ quizId: quizIds[1].id, answer: "東京" }]);
  await db
    .insert(TrueFalseQuizTable)
    .values([{ quizId: quizIds[2].id, answer: false }]);
}
