import { FullQuiz } from "@/lib/quiz-actions";
import { QuizResult } from "@/lib/quiz-form";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  quizzes: FullQuiz[];
  results: QuizResult[];
};

const ResultsView = ({ quizzes, results }: Props) => {
  return (
    <div>
      <Button asChild size="lg">
        <Link href="/puratto">OK</Link>
      </Button>
    </div>
  );
};

export default ResultsView;
