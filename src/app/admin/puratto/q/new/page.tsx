"use client";

import { QuizView } from "@/components/admin/quiz/quiz-view";
import { useQuizForm } from "@/hooks/use-quiz-form";
import { insertQuiz } from "@/lib/quiz/actions";
import { QuizValues } from "@/lib/quiz/editor";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const form = useQuizForm();

  const handleSubmit = async (values: QuizValues) => {
    const newQuizId = await insertQuiz(values);
    toast.success("問題を作成しました");
    router.push(`/admin/puratto/q/${newQuizId}`);
  };

  return <QuizView heading="問題作成" form={form} onSubmit={handleSubmit} />;
};

export default Page;
