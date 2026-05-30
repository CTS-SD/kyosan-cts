"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { QuizEditor } from "@/app/admin/puratto/q/_components/quiz-editor";
import { fromEditorValues, type QuizEditorValues } from "@/features/quizzes";
import { useCreateQuiz } from "@/features/quizzes/hooks/use-quiz-mutations";

const Page = () => {
  const router = useRouter();
  const { mutateAsync: createQuiz } = useCreateQuiz();

  const handleSubmit = async (values: QuizEditorValues) => {
    const { id } = await createQuiz(fromEditorValues(values));
    toast.success("問題を作成しました");
    router.push(`/admin/puratto/q/${id}`);
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
