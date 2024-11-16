import {
  FlowerIcon,
  HeartHandshakeIcon,
  LightbulbIcon,
  MessageSquareHeartIcon,
  PartyPopperIcon,
} from "lucide-react";
import { cloneElement } from "react";
import { z } from "zod";

export enum Department {
  general = "総務",
  recreation = "レク",
  sd = "SD",
  development = "開発",
  pr = "広報",
}

export enum Major {
  business = "経営",
  language = "外国語",
  world = "国際関係",
  economy = "経済",
  law = "法",
  science = "理",
  social = "現代社会",
  culture = "文化",
  bio = "生命科",
}

export const memberSchema = z.object({
  name: z.string(),
  id: z.string(),
  department: z.nativeEnum(Department),
  major: z.nativeEnum(Major),
});

export const membersSchema = z.array(memberSchema);

export const members = membersSchema.parse(
  JSON.parse(process.env.NEXT_PUBLIC_NEW_MEMBERS_2024!),
);

const departmentIcons = {
  [Department.pr]: <MessageSquareHeartIcon size={64} />,
  [Department.sd]: <HeartHandshakeIcon size={64} />,
  [Department.development]: <LightbulbIcon size={64} />,
  [Department.recreation]: <PartyPopperIcon size={64} />,
  [Department.general]: <FlowerIcon size={64} />,
};

export function getMemberById(id: string) {
  return members.find((member) => member.id === id);
}

export function getMembersByDepartment(department: Department) {
  return members.filter((member) => member.department === department);
}

export function getDepartmentIcon(department: Department, size = 64) {
  return cloneElement(departmentIcons[department], { size });
}
