"use client";

import { EditIcon, EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "../ui/menu";

type Props = {
  quizId: number;
};

export const QuizPlayAdminMenu = ({ quizId }: Props) => {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size="icon" variant="outline">
          <EllipsisIcon />
        </Button>
      </MenuTrigger>
      <MenuPopup align="end">
        <MenuItem asChild>
          <Link href={`/admin/puratto/q/${quizId}`}>
            <EditIcon />
            問題を編集
          </Link>
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
};
