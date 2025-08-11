"use client";

import { QuizView } from "@/components/admin/quiz/quiz-view";
import { useQuizForm } from "@/hooks/use-quiz-form";
import { insertQuiz } from "@/lib/quiz-actions";
import { makePseudoQuiz, QuizValues } from "@/lib/quiz-editor";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const form = useQuizForm();

  const formValues = form.watch();
  const pseudoQuiz = makePseudoQuiz(formValues);

  const handleSubmit = async (values: QuizValues) => {
    const newQuizId = await insertQuiz(values);
    toast.success("問題を作成しました");
    router.push(`/admin/puratto/q/${newQuizId}`);
  };

  return (
    <QuizView
      heading="問題作成"
      form={form}
      previewQuiz={pseudoQuiz}
      onSubmit={handleSubmit}
      labels={{ submit: "作成" }}
    />
  );
};

export default Page;
