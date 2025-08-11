import { FullQuiz } from "@/lib/quiz-actions";
import { QuizFormValues } from "@/lib/quiz-editor";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { QuizEditor } from "./quiz-editor";
import { QuizPreview } from "./quiz-preview";

type Props = {
  heading?: React.ReactNode;
  form: UseFormReturn<QuizFormValues>;
  previewQuiz: FullQuiz;
  labels: {
    submit: string;
  };
  onSubmit: (values: QuizFormValues) => Promise<void>;
};

export const QuizView = ({
  heading,
  form,
  previewQuiz,
  labels,
  onSubmit,
}: Props) => {
  return (
    <div className="max-w-5xl mx-auto flex h-[calc(100dvh-48px)]">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <Button asChild variant="secondary">
              <Link href="/admin/puratto">
                <ArrowLeftIcon />
              </Link>
            </Button>
            {heading && <div className="font-bold">{heading}</div>}
          </div>
          <QuizEditor
            form={form}
            onSubmit={onSubmit}
            className="mt-6"
            labels={labels}
          />
        </div>
      </div>
      <div className="flex-1">
        <QuizPreview quiz={previewQuiz} />
      </div>
    </div>
  );
};
