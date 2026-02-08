import { EditIcon, EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { useQuizPlay } from "@/ctx/quiz-play";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const QuizPlayAdminMenu = () => {
  const { quiz } = useQuizPlay();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/admin/puratto/q/${quiz.id}`}>
            <EditIcon />
            問題を編集
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
