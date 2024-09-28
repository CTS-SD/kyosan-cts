import { QuizFormContext } from "@/app/test/QuizFormContext";
import QuizFormInput from "@/app/test/QuizFormInput";
import QuizFormOX from "@/app/test/QuizFormOX";
import QuizFormSelect from "@/app/test/QuizFormSelect";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { type Quiz } from "@/db/schema";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  quiz?: Quiz;
};

const Preview = ({ quiz }: Props) => {
  if (!quiz) return null;
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Progress value={30} />
      </div>
      <div className="text-lg leading-snug font-semibold rounded-lg py-10 px-2">
        <Markdown remarkPlugins={[remarkGfm]}>{quiz.question}</Markdown>
      </div>
      <QuizFormContext.Provider
        value={{
          showResult: () => {},
          value: "",
          setValue: () => {},
          isShowResult: false,
          isPreview: true,
        }}
      >
        <div className="">
          {quiz.type === "select" && <QuizFormSelect quiz={quiz} />}
          {quiz.type === "input" && <QuizFormInput quiz={quiz} />}
          {quiz.type === "ox" && <QuizFormOX quiz={quiz} />}
        </div>
      </QuizFormContext.Provider>
    </div>
  );
};

export default Preview;
