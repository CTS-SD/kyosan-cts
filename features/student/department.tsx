import { HeartHandshakeIcon, LightbulbIcon, MessageSquareHeartIcon, PartyPopperIcon, SparklesIcon } from "lucide-react";

enum DeptEnum {
  general = "総務部署",
  recreation = "レク部署",
  sd = "SD部署",
  development = "開発部署",
  pr = "広報部署",
}

const departmentAssets = {
  [DeptEnum.general]: {
    icon: SparklesIcon,
    styles: "bg-gradient-to-br from-blue-600 to-cyan-500",
  },
  [DeptEnum.recreation]: {
    icon: PartyPopperIcon,
    styles: "bg-gradient-to-br from-green-600 to-lime-500",
  },
  [DeptEnum.sd]: {
    icon: HeartHandshakeIcon,
    styles: "bg-gradient-to-br from-orange-600 to-amber-500",
  },
  [DeptEnum.development]: {
    icon: LightbulbIcon,
    styles: "bg-gradient-to-br from-pink-600 to-rose-400",
  },
  [DeptEnum.pr]: {
    icon: MessageSquareHeartIcon,
    styles: "bg-gradient-to-br from-purple-600 to-fuchsia-400",
  },
} as const;

export const getDepartmentAsset = (department: string) => {
  const asset = departmentAssets[department as DeptEnum];
  return asset ?? departmentAssets[DeptEnum.general];
};
