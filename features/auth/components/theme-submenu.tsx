"use client";

import { MoonIcon, PaintbrushIcon, SunIcon, TabletSmartphoneIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../../../components/ui/dropdown-menu";

const themes = [
  { id: "light", label: "ライト", icon: SunIcon },
  { id: "dark", label: "ダーク", icon: MoonIcon },
  { id: "system", label: "自動", icon: TabletSmartphoneIcon },
];

export const ThemeSubmenu = () => {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <PaintbrushIcon /> テーマ
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={currentTheme} onValueChange={setTheme}>
          {themes.map((theme) => (
            <DropdownMenuRadioItem key={theme.id} value={theme.id}>
              <theme.icon />
              {theme.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};
