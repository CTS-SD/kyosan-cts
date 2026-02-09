import { EditIcon, EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { useQuizPlay } from "../../hooks/use-quiz-play";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const QuizPlayAdminMenu = () => {
  const { quiz } = useQuizPlay();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>管理者メニュー</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/admin/puratto/q/${quiz.id}`} target="_blank" rel="noopener noreferrer">
              <EditIcon />
              問題を編集
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
