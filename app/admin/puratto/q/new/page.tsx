"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { QuizEditor } from "@/components/admin/quiz/quiz-editor";
import { insertQuiz, type QuizEditorValues } from "@/lib/quiz";

const Page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit = async (values: QuizEditorValues) => {
    const newQuizId = await insertQuiz(values);
    queryClient.invalidateQueries({ queryKey: ["quiz-tags"] });
    toast.success("問題を作成しました");
    router.push(`/admin/puratto/q/${newQuizId}`);
  };

  return (
    <QuizEditor.Provider onSubmit={handleSubmit}>
      <QuizEditor.Wrapper>
        <QuizEditor.Main>
          <QuizEditor.Header>
            <QuizEditor.Back />
            <QuizEditor.Title className="mr-auto">
              <span className="hidden sm:block">ぷらっとテスト</span>
              <span className="text-muted-foreground">新規作成</span>
            </QuizEditor.Title>
            <QuizEditor.MobilePreviewButton />
            <QuizEditor.Menu />
          </QuizEditor.Header>
          <QuizEditor.Fields />
          <QuizEditor.Footer>
            <QuizEditor.Cancel />
            <QuizEditor.Submit>作成</QuizEditor.Submit>
          </QuizEditor.Footer>
        </QuizEditor.Main>
        <QuizEditor.Preview />
      </QuizEditor.Wrapper>
    </QuizEditor.Provider>
  );
};

export default Page;
