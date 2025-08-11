import { QuizData } from "@/lib/quiz-data";
import { QuizResult } from "@/lib/quiz-form";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  quizzes: QuizData[];
  results: QuizResult[];
};

export const QuizResultsView = ({ quizzes, results }: Props) => {
  return (
    <div>
      <Button asChild size="lg">
        <Link href="/puratto">OK</Link>
      </Button>
    </div>
  );
};
