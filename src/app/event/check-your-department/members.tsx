import { PiggyBankIcon } from "lucide-react";

enum Department {
  sample = "サンプル",
}

export const members = {
  g2000000: Department.sample,
};

export function getDepartmentIcon(department: Department) {
  switch (department) {
    case Department.sample:
      return <PiggyBankIcon size={64} />;
    default:
      return null;
  }
}
