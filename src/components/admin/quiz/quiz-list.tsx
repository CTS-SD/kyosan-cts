import { QuizData } from "@/lib/quiz/data";
import { QuizItem } from "./quiz-item";
import { Button } from "@/components/ui/button";

type Props = {
  quizzes: QuizData[];
};

export const QuizList = ({ quizzes }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          return <QuizItem key={quiz.id} quiz={quiz} />;
        })}
      </div>
      <div className="mt-4">
        <Button className="w-full" variant="outline">
          さらに表示
        </Button>
      </div>
    </div>
  );
};
