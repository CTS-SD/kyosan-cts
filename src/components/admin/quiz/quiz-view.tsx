import { Button } from "@/components/ui/button";
import { makePseudoQuiz, QuizValues } from "@/lib/quiz/editor";
import { ArrowLeftIcon, EyeIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { QuizEditor } from "./quiz-editor";
import { QuizPreview } from "./quiz-preview";
import { QuizViewMenu } from "./quiz-view-menu";

type Props = {
  heading: React.ReactNode;
  form: UseFormReturn<QuizValues>;
  onSubmit: (values: QuizValues) => Promise<void>;
};

export const QuizView = ({ heading, form, onSubmit }: Props) => {
  const [showPreviewOverlay, setShowPreviewOverlay] = useState(false);

  const formValues = form.watch();
  const previewQuiz = makePseudoQuiz(formValues);

  const quizId = formValues.id;
  const isNew = quizId === null;

  return (
    <div className="mx-auto flex max-w-6xl">
      <div className="flex-1">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="icon" asChild>
              <Link href="/admin/puratto" aria-label="戻る">
                <ArrowLeftIcon />
              </Link>
            </Button>
            {heading && <div className="font-bold">{heading}</div>}
            <div className="ml-auto flex items-center gap-2">
              <Button
                className="sm:hidden"
                variant="outline"
                onClick={() => setShowPreviewOverlay(true)}
                aria-label="プレビューを表示"
              >
                <EyeIcon />
                プレビュー
              </Button>
              {!isNew && <QuizViewMenu quizId={quizId} />}
            </div>
          </div>
          <QuizEditor
            form={form}
            onSubmit={onSubmit}
            className="mt-6"
            isNew={isNew}
          />
        </div>
      </div>
      <div className="sticky top-12 hidden h-[calc(100dvh-48px)] flex-1 sm:block">
        <QuizPreview quiz={previewQuiz} />
      </div>
      {showPreviewOverlay && (
        <div className="bg-background fixed inset-0 z-30 flex flex-col overflow-auto overscroll-contain transition-all duration-200 ease-out sm:hidden starting:scale-95 starting:opacity-0">
          <div className="w-full grow">
            <QuizPreview
              quiz={previewQuiz}
              headerEndContent={
                <Button
                  variant="outline"
                  className=""
                  onClick={() => setShowPreviewOverlay(false)}
                >
                  <XIcon aria-hidden />
                  閉じる
                </Button>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
