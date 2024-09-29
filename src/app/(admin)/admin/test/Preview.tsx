import { type Result } from "@/app/test/page";
import { QuizFormContext } from "@/app/test/QuizFormContext";
import QuizFormInput from "@/app/test/QuizFormInput";
import QuizFormOX from "@/app/test/QuizFormOX";
import QuizFormSelect from "@/app/test/QuizFormSelect";
import QuizResult from "@/app/test/QuizResult";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type Quiz } from "@/db/schema";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  quiz?: Quiz;
};

const Preview = ({ quiz }: Props) => {
  const [isShowResult, setIsShowResult] = useState(false);
  const [result, setResult] = useState<Result>();
  const [value, setValue] = useState<string | null>(null);

  const showResult = (result: boolean, userAns: string) => {
    if (!quiz) return;

    setIsShowResult(true);
    const r = {
      correct: result,
      userAnswer: userAns,
      quiz: quiz,
    };
    setResult(r);
  };

  const handleNext = () => {
    setIsShowResult(false);
    setValue(null);
  };

  if (!quiz) return null;
  return (
    <div className="relative min-h-[calc(90dvh_-_64px)] md:min-h-[calc(85dvh_-_64px)] md:sticky md:top-[80px] flex flex-col">
      <Badge className="mb-4 w-fit" variant="outline">
        プレビュー
      </Badge>
      <div className="flex items-center gap-2">
        <Progress value={30} />
      </div>
      <div className="text-lg leading-snug font-semibold rounded-lg py-10 px-2 question-md">
        <Markdown remarkPlugins={[remarkGfm]}>{quiz.question}</Markdown>
      </div>
      <QuizFormContext.Provider
        value={{
          showResult,
          value,
          setValue,
          isShowResult,
          isPreview: true,
        }}
      >
        <div className="grow flex flex-col">
          {quiz.type === "select" && <QuizFormSelect quiz={quiz} />}
          {quiz.type === "input" && <QuizFormInput quiz={quiz} />}
          {quiz.type === "ox" && <QuizFormOX quiz={quiz} />}
        </div>
      </QuizFormContext.Provider>
      {isShowResult && (
        <QuizResult
          isFinal={false}
          result={{
            ...result!,
            quiz: quiz,
          }}
          onNext={handleNext}
          onFinal={() => {}}
        />
      )}
    </div>
  );
};

export default Preview;
