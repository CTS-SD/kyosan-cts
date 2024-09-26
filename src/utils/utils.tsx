import { client } from "@/db/hono";
import { QuizType } from "@/db/schema";
import { clsx, type ClassValue } from "clsx";
import {
  CircleIcon,
  CircleOffIcon,
  LayoutListIcon,
  TextCursorIcon,
  XIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const digit2alpha: { [key: number]: string } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
  10: "K",
  11: "L",
  12: "M",
  13: "N",
  14: "O",
  15: "P",
  16: "Q",
  17: "R",
  18: "S",
  19: "T",
  20: "U",
  21: "V",
  22: "W",
  23: "X",
  24: "Y",
  25: "Z",
} as const;

export function getAnswerElement(answer: string) {
  if (answer === "__true__") {
    return <CircleIcon size={16} />;
  } else if (answer === "__false__") {
    return <XIcon size={16} />;
  }

  return answer;
}

export function getQuizTypeText(type: QuizType) {
  switch (type) {
    case "select":
      return "選択問題";
    case "input":
      return "テキスト";
    case "ox":
      return "マルバツ";
    default:
      return "?";
  }
}

export function getQuizIcon(type: QuizType) {
  switch (type) {
    case "select":
      return <LayoutListIcon size={16} />;
    case "input":
      return <TextCursorIcon size={16} />;
    case "ox":
      return <CircleOffIcon size={16} />;
    default:
      return null;
  }
}

export function isApprovedEmail(email?: string | null) {
  if (!email) return false;
  return process.env.APPROVED_EMAILS!.split(",").includes(email);
}
