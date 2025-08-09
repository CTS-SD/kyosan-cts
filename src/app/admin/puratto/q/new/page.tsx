"use client";

import { QuizEditor } from "@/components/admin/quiz-editor";
import { QuizPreview } from "@/components/admin/quiz-preview";
import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/hooks/use-quiz-form";
import { createQuiz } from "@/lib/quiz-actions";
import { makeQuizFromFormValues, QuizFormValues } from "@/lib/quiz-editor";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const form = useQuizForm();

  const formValues = form.watch();
  const pseudoQuiz = makeQuizFromFormValues(formValues);

  const handleSubmit = async (values: QuizFormValues) => {
    const newQuizId = await createQuiz(values);
    toast.success("問題を作成しました");
    router.push(`/admin/puratto/q/${newQuizId}`);
  };

  return (
    <div className="max-w-5xl mx-auto flex h-[calc(100dvh-48px)]">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Button asChild variant="secondary">
            <Link href="/admin/puratto">
              <ArrowLeftIcon />
              キャンセル
            </Link>
          </Button>
          <QuizEditor
            form={form}
            onSubmit={handleSubmit}
            className="mt-6"
            labels={{ submit: "作成" }}
          />
        </div>
      </div>
      <div className="flex-1">
        <QuizPreview quiz={pseudoQuiz} />
      </div>
    </div>
  );
};

export default Page;
