"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QuizEditor } from "@/app/admin/puratto/q/_components/quiz-editor";
import { type QuizData, type QuizEditorValues, toEditorValues, updateQuiz } from "@/features/quiz";

type Props = {
  quiz: QuizData;
};

export const ClientView = ({ quiz }: Props) => {
  const queryClient = useQueryClient();

  const handleSubmit = async (values: QuizEditorValues) => {
    await updateQuiz(quiz.id, values);
    queryClient.invalidateQueries({ queryKey: ["quiz-tags"] });
    toast.success("問題を保存しました");
  };

  return (
    <QuizEditor.Provider defaultValues={toEditorValues(quiz)} onSubmit={handleSubmit}>
      <QuizEditor.Wrapper>
        <QuizEditor.Main>
          <QuizEditor.Header>
            <QuizEditor.Back />
            <QuizEditor.Title className="mr-auto">
              <span className="hidden sm:block">ぷらっとテスト</span>
              <span className="text-muted-foreground">No.{quiz.id}</span>
            </QuizEditor.Title>
            <QuizEditor.MobilePreviewButton />
            <QuizEditor.Menu />
          </QuizEditor.Header>
          <QuizEditor.Fields />
          <QuizEditor.Footer>
            <QuizEditor.Cancel />
            <QuizEditor.Submit>保存</QuizEditor.Submit>
          </QuizEditor.Footer>
        </QuizEditor.Main>
        <QuizEditor.Preview />
      </QuizEditor.Wrapper>
    </QuizEditor.Provider>
  );
};
