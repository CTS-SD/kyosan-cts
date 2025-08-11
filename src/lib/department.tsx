import {
  HeartHandshakeIcon,
  LightbulbIcon,
  MessageSquareHeartIcon,
  PartyPopperIcon,
  SparklesIcon,
} from "lucide-react";

enum DeptEnum {
  general = "総務部署",
  recreation = "レク部署",
  sd = "SD部署",
  development = "開発部署",
  pr = "広報部署",
}

const departmentIcons = {
  [DeptEnum.general]: <SparklesIcon />,
  [DeptEnum.recreation]: <PartyPopperIcon />,
  [DeptEnum.sd]: <HeartHandshakeIcon />,
  [DeptEnum.development]: <LightbulbIcon />,
  [DeptEnum.pr]: <MessageSquareHeartIcon />,
} as const;

const departmentStyles = {
  [DeptEnum.general]: "bg-gradient-to-br from-blue-600 to-cyan-500",
  [DeptEnum.recreation]: "bg-gradient-to-br from-green-600 to-lime-500",
  [DeptEnum.sd]: "bg-gradient-to-br from-orange-600 to-amber-500",
  [DeptEnum.development]: "bg-gradient-to-br from-pink-600 to-rose-400",
  [DeptEnum.pr]: "bg-gradient-to-br from-purple-600 to-fuchsia-400",
} as const;

export const getDepartmentIcon = (department: string) => {
  return (
    departmentIcons[department as DeptEnum] ?? departmentIcons[DeptEnum.general]
  );
};

export const getDepartmentStyles = (department: string) => {
  return (
    departmentStyles[department as DeptEnum] ??
    departmentStyles[DeptEnum.general]
  );
};
