import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Student } from "@/lib/db/schema";
import { StudentItem } from "./student-item";

type Props = {
  department: string;
  students: Student[];
};

export const DepartmentBox = ({ department, students }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{department}</CardTitle>
        <CardDescription>{students.length}名</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {students.map((student) => (
            <StudentItem key={student.id} student={student} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
