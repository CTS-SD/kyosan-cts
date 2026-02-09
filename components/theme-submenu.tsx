"use client";

import { PaletteIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";

const themes = [
  { id: "light", label: "ライト" },
  { id: "dark", label: "ダーク" },
  { id: "system", label: "システム" },
];

export const ThemeSubmenu = () => {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <PaletteIcon /> テーマ
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={currentTheme} onValueChange={setTheme}>
          {themes.map((theme) => (
            <DropdownMenuRadioItem key={theme.id} value={theme.id}>
              {theme.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};
