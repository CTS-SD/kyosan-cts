import { PiggyBankIcon } from "lucide-react";

enum Department {
  pr = "広報",
  sd = "SD",
  development = "開発",
  recreation = "レク",
  general = "総務",
}

type Member = {
  name: string;
  id: string;
  department: Department;
};

export const members: Member[] = [
  {
    name: "田中 太郎",
    id: "g2353126",
    department: Department.pr,
  },
];

export function getMemberById(id: string) {
  return members.find((member) => member.id === id);
}

export function getDepartmentIcon(department: Department) {
  switch (department) {
    case Department.pr:
      return <PiggyBankIcon size={64} />;
    default:
      return null;
  }
}
