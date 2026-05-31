import { db } from "@/db";
import { DepartmentTable, FacultyTable, QuizTable, StudentTable } from "@/db/schema";

export async function seedDb() {
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

  // Seed Students.
  // Student numbers must satisfy the checksum used by StudentNumberSchema
  // (digit sum divisible by 10); the last digit is a computed check digit so
  // the seeded numbers can actually be entered via the member lookup form.
  const withCheckDigit = (base: number) => {
    const body = String(base).padStart(5, "0");
    const sum = [...body].reduce((acc, ch) => acc + Number(ch), 0);
    const check = (10 - (sum % 10)) % 10;
    return `${body}${check}`;
  };

  await db.insert(StudentTable).values(
    departments.flatMap((dept, index) => [
      {
        name: "田中太郎",
        departmentId: dept.id,
        facultyId: faculties[0].id,
        studentNumber: withCheckDigit(10000 + index * 2),
      },
      {
        name: "佐藤花子",
        departmentId: dept.id,
        facultyId: faculties[1].id,
        studentNumber: withCheckDigit(10000 + index * 2 + 1),
      },
    ]),
  );

  // Seed Quizzes (type-specific values live in the `params` jsonb column)
  await db.insert(QuizTable).values([
    {
      type: "select",
      question: "1+1は？",
      explanation: "1+1は2です。",
      isPublished: true,
      params: { correctChoices: ["2"], incorrectChoices: ["1", "3", "4"] },
    },
    {
      type: "select",
      question: "次のうち、果物はどれですか？",
      explanation: "りんごは果物です。",
      isPublished: true,
      params: { correctChoices: ["りんご"], incorrectChoices: ["にんじん", "じゃがいも", "ピーマン"] },
    },
    {
      type: "select",
      question: "下書きのクイズ",
      explanation: null,
      isPublished: false,
      params: { correctChoices: ["A"], incorrectChoices: ["B", "C"] },
    },
  ]);
}
