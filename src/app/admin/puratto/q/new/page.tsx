"use client";

import QuizForm from "@/components/admin/quiz-form";
import QuizPreview from "@/components/admin/quiz-preview";
import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/hooks/use-quiz-form";
import { createQuiz } from "@/lib/quiz-actions";
import { makeQuizFromFormValues, QuizFormValues } from "@/lib/quiz-editor";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

const Page = ({}: Props) => {
  const router = useRouter();
  const form = useQuizForm();

  const formValues = form.watch();
  const pseudoQuiz = makeQuizFromFormValues(formValues);

  const handleSubmit = async (values: QuizFormValues) => {
    const newQuizId = await createQuiz(values);
    router.push(`/admin/puratto/q/${newQuizId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex gap-4">
      <div className="flex-1">
        <Button asChild variant="secondary">
          <Link href="/admin/puratto">
            <ArrowLeftIcon />
            キャンセル
          </Link>
        </Button>
        <QuizForm form={form} onSubmit={handleSubmit} className="mt-6" />
      </div>
      <div className="flex-1">
        <QuizPreview quiz={pseudoQuiz} />
      </div>
    </div>
  );
};

export default Page;
