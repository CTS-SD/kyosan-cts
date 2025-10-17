import { Button } from "@/components/ui/button";
import { QuizData } from "@/lib/quiz/data";
import { QuizValues } from "@/lib/quiz/editor";
import { ArrowLeftIcon, EyeIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { QuizEditor } from "./quiz-editor";
import { QuizPreview } from "./quiz-preview";
import { QuizViewMenu } from "./quiz-view-menu";

type Props = {
  heading?: React.ReactNode;
  form: UseFormReturn<QuizValues>;
  previewQuiz: QuizData | null;
  onSubmit: (values: QuizValues) => Promise<void>;
};

export const QuizView = ({ heading, form, previewQuiz, onSubmit }: Props) => {
  const [showPreviewOverlay, setShowPreviewOverlay] = useState(false);

  const quizId = form.getValues("id");
  const isNew = quizId == null;

  return (
    <div className="mx-auto flex h-[calc(100dvh-48px)] max-w-5xl">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <Button asChild variant="secondary" size="icon">
              <Link href="/admin/puratto">
                <ArrowLeftIcon />
              </Link>
            </Button>
            {heading && <div className="font-bold">{heading}</div>}
            <Button
              className="ml-auto sm:hidden"
              variant="secondary"
              onClick={() => setShowPreviewOverlay(true)}
            >
              <EyeIcon />
              プレビュー
            </Button>
            {!isNew && (
              <div className="ml-auto">
                <QuizViewMenu quizId={quizId} />
              </div>
            )}
          </div>
          <QuizEditor
            form={form}
            onSubmit={onSubmit}
            className="mt-6"
            isNew={isNew}
          />
        </div>
      </div>
      <div className="hidden flex-1 sm:block">
        <QuizPreview quiz={previewQuiz} />
      </div>
      {showPreviewOverlay && (
        <div className="bg-background fixed inset-0 flex flex-col transition-all duration-200 ease-out sm:hidden starting:scale-95 starting:opacity-0">
          <div className="flex justify-end px-4 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowPreviewOverlay(false)}
            >
              <XIcon />
              閉じる
            </Button>
          </div>
          <div className="w-full grow">
            <QuizPreview quiz={previewQuiz} />
          </div>
        </div>
      )}
    </div>
  );
};
