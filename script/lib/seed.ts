import { fakerJA as faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "@/lib/db/schema";
import {
  DepartmentTable,
  FacultyTable,
  QuizTable,
  SelectQuizTable,
  StudentTable,
  TextQuizTable,
  TrueFalseQuizTable,
} from "@/lib/db/schema";

const usedStudentNumbers = new Set<string>();

function generateStudentNumber(): string {
  while (true) {
    const digits = faker.string.numeric(6);
    const sum = digits.split("").reduce((acc, d) => acc + Number(d), 0);

    if (sum % 10 !== 0) continue;
    if (usedStudentNumbers.has(digits)) continue;

    usedStudentNumbers.add(digits);
    return digits;
  }
}

export async function seeding() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!connectionString.endsWith("/test") && !connectionString.endsWith("/dev")) {
    throw new Error('DATABASE_URL must point to the "test" or "dev" database to prevent data loss');
  }

  faker.seed(1);

  const client = new Client({ connectionString });
  await client.connect();

  const db = drizzle(client, { schema });

  // Faculties
  const faculties = await db
    .insert(FacultyTable)
    .values(
      [
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
      ].map((name) => ({
        name,
      })),
    )
    .returning({ id: FacultyTable.id });

  // Departments
  const departments = await db
    .insert(DepartmentTable)
    .values(["総務部署", "レク部署", "SD部署", "開発部署", "広報部署"].map((name) => ({ name })))
    .returning({ id: DepartmentTable.id });

  // Students
  await db.insert(StudentTable).values(
    departments.flatMap((dept) =>
      Array.from({ length: 5 }).map(() => {
        const faculty = faker.helpers.arrayElement(faculties);
        return {
          name: faker.person.fullName(),
          departmentId: dept.id,
          facultyId: faculty.id,
          studentNumber: generateStudentNumber(),
        };
      }),
    ),
  );

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
  await db.insert(TextQuizTable).values([{ quizId: quizIds[1].id, answer: "東京" }]);
  await db.insert(TrueFalseQuizTable).values([{ quizId: quizIds[2].id, answer: false }]);

  await client.end();
}
