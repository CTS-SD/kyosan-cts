import { EllipsisIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useQuizSession } from "./quiz-session";

export const QuizPlayAdminMenu = () => {
  const { quizzes, currentQuizIndex } = useQuizSession();
  const quiz = quizzes.at(currentQuizIndex);

  if (!quiz) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/admin/puratto/q/${quiz.id}`} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon />
              問題を編集
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
