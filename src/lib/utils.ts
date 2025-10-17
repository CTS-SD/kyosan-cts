import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitByLines(text?: string | null): string[] {
  if (typeof text !== "string") {
    return [];
  }

  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export async function copyToClipboard(text: string) {
  if ("clipboard" in navigator && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  return false;
}
