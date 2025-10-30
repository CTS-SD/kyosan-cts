"use client";

import { PaletteIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  MenuRadioGroup,
  MenuRadioItem,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
} from "./ui/menu";

const themes = [
  { id: "light", label: "ライト" },
  { id: "dark", label: "ダーク" },
  { id: "system", label: "システム" },
];

export const ThemeSubmenu = () => {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <MenuSub>
      <MenuSubTrigger>
        <PaletteIcon /> テーマ
      </MenuSubTrigger>
      <MenuSubPopup>
        <MenuRadioGroup value={currentTheme} onValueChange={setTheme}>
          {themes.map((theme) => (
            <MenuRadioItem key={theme.id} value={theme.id}>
              {theme.label}
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
      </MenuSubPopup>
    </MenuSub>
  );
};
