import { ArrowLeftIcon, EyeIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { makePseudoQuiz, type QuizEditorValues } from "../../../lib/quiz";
import { QuizPlay } from "../../quiz-play/quiz-play";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { PlayfulProgress } from "../../ui/playful-progress";
import { QuizEditor } from "./quiz-editor";
import { QuizViewMenu } from "./quiz-view-menu";

type Props = {
  heading: React.ReactNode;
  form: UseFormReturn<QuizEditorValues>;
  onSubmit: (values: QuizEditorValues) => Promise<void>;
};

export const QuizView = ({ heading, form, onSubmit }: Props) => {
  const formValues = form.watch();
  const quiz = makePseudoQuiz(formValues);

  const quizId = formValues.id;
  const isNew = quizId === null;

  if (!quiz) return null;

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
            {heading && <h1 className="font-bold">{heading}</h1>}
            <div className="ml-auto flex items-center gap-2">
              <Dialog>
                <DialogTrigger className="md:hidden" asChild>
                  <Button variant="outline" aria-label="プレビューを表示">
                    <EyeIcon />
                    プレビュー
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex h-[95dvh] w-full flex-col bg-background" showCloseButton={false}>
                  <DialogTitle className="sr-only">プレビュー</DialogTitle>
                  <QuizPlay.Root quiz={quiz} className="w-full overflow-auto">
                    <QuizPlay.Header className="pt-2">
                      <Badge variant="outline">プレビュー</Badge>
                      <PlayfulProgress value={20} />
                      <DialogClose asChild>
                        <Button variant="outline">
                          <XIcon />
                          閉じる
                        </Button>
                      </DialogClose>
                    </QuizPlay.Header>
                    <QuizPlay.Content />
                  </QuizPlay.Root>
                </DialogContent>
              </Dialog>
              {!isNew && <QuizViewMenu quizId={quizId} />}
            </div>
          </div>
          <QuizEditor form={form} onSubmit={onSubmit} className="mt-6" isNew={isNew} />
        </div>
      </div>
      <div className="sticky top-12 hidden h-[calc(100dvh-48px)] max-w-md flex-1 overflow-auto overscroll-contain md:block">
        <QuizPlay.Root quiz={quiz}>
          <QuizPlay.Header>
            <Badge variant="outline">プレビュー</Badge>
            <PlayfulProgress value={20} />
          </QuizPlay.Header>
          <QuizPlay.Content />
        </QuizPlay.Root>
      </div>
    </div>
  );
};
