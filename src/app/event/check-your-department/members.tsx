import {
  FlowerIcon,
  HeartHandshakeIcon,
  LightbulbIcon,
  MessageSquareHeartIcon,
  PartyPopperIcon,
} from "lucide-react";
import { cloneElement } from "react";

export enum Department {
  pr = "広報部署",
  sd = "SD部署",
  development = "開発部署",
  recreation = "レク部署",
  general = "総務部署",
}

export type Member = {
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
  {
    name: "佐藤 花子",
    id: "g2353127",
    department: Department.sd,
  },
  {
    name: "鈴木 一郎",
    id: "g2353128",
    department: Department.development,
  },
  {
    name: "中村 優子",
    id: "g2353129",
    department: Department.recreation,
  },
  {
    name: "山本 健二",
    id: "g2353130",
    department: Department.general,
  },
  {
    name: "井上 美咲",
    id: "g2353131",
    department: Department.pr,
  },
  {
    name: "小林 剛",
    id: "g2353132",
    department: Department.sd,
  },
  {
    name: "渡辺 優",
    id: "g2353133",
    department: Department.development,
  },
  {
    name: "松本 翔",
    id: "g2353134",
    department: Department.recreation,
  },
  {
    name: "藤本 理恵",
    id: "g2353135",
    department: Department.general,
  },
  {
    name: "高橋 舞",
    id: "g2353136",
    department: Department.pr,
  },
  {
    name: "吉田 涼",
    id: "g2353137",
    department: Department.sd,
  },
  {
    name: "岡田 誠",
    id: "g2353138",
    department: Department.development,
  },
  {
    name: "三浦 美奈",
    id: "g2353139",
    department: Department.recreation,
  },
  {
    name: "西村 勇気",
    id: "g2353140",
    department: Department.general,
  },
  {
    name: "清水 愛",
    id: "g2353141",
    department: Department.pr,
  },
  {
    name: "山田 晴",
    id: "g2353142",
    department: Department.sd,
  },
  {
    name: "木村 雅",
    id: "g2353143",
    department: Department.development,
  },
  {
    name: "橋本 忍",
    id: "g2353144",
    department: Department.recreation,
  },
  {
    name: "森本 沙織",
    id: "g2353145",
    department: Department.general,
  },
  {
    name: "川村 匠",
    id: "g2353146",
    department: Department.pr,
  },
  {
    name: "村上 隆",
    id: "g2353147",
    department: Department.sd,
  },
  {
    name: "長谷川 遼",
    id: "g2353148",
    department: Department.development,
  },
  {
    name: "石川 絵美",
    id: "g2353149",
    department: Department.recreation,
  },
  {
    name: "福田 奈緒",
    id: "g2353150",
    department: Department.general,
  },
  {
    name: "中川 涼子",
    id: "g2353151",
    department: Department.pr,
  },
  {
    name: "大島 健太",
    id: "g2353152",
    department: Department.sd,
  },
  {
    name: "平田 彩香",
    id: "g2353153",
    department: Department.development,
  },
  {
    name: "松井 優一",
    id: "g2353154",
    department: Department.recreation,
  },
  {
    name: "坂本 実",
    id: "g2353155",
    department: Department.general,
  },
  {
    name: "竹内 美沙",
    id: "g2353156",
    department: Department.pr,
  },
  {
    name: "和田 渉",
    id: "g2353157",
    department: Department.sd,
  },
  {
    name: "安藤 薫",
    id: "g2353158",
    department: Department.development,
  },
  {
    name: "永田 晴香",
    id: "g2353159",
    department: Department.recreation,
  },
  {
    name: "藤原 真",
    id: "g2353160",
    department: Department.general,
  },
];

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
