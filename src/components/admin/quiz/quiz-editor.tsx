"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { QuizValues } from "@/lib/quiz/editor";
import { quizTypes } from "@/lib/quiz/types";
import { SelectValue } from "@radix-ui/react-select";
import { useNavigationGuard } from "next-navigation-guard";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { QuizEditorSelect } from "./quiz-editor-select";
import { QuizEditorText } from "./quiz-editor-text";
import { QuizEditorTrueFalse } from "./quiz-editor-true-false";

type Props = {
  form: UseFormReturn<QuizValues>;
  onSubmit: (values: QuizValues) => Promise<void>;
  className?: string;
  isNew: boolean;
};

const LABELS = {
  new: {
    submit: "作成",
  },
  edit: {
    submit: "保存",
  },
};

export const QuizEditor = ({ form, onSubmit, className, isNew }: Props) => {
  const labels = isNew ? LABELS.new : LABELS.edit;
  const { isSubmitting, isDirty } = form.formState;
  const formType = form.watch("type");

  useNavigationGuard({
    enabled: isDirty,
    confirm: () =>
      window.confirm("保存されていない変更があります。ページを離れますか？"),
  });

  const handleSubmit = async (values: QuizValues) => {
    await onSubmit(values);
  };

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset className="space-y-6" disabled={isSubmitting}>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">回答形式</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger size="sm">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {quizTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>問題文</FormLabel>
                  <FormControl>
                    <Textarea placeholder="問題文を入力" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formType === "select" && <QuizEditorSelect form={form} />}
            {formType === "text" && <QuizEditorText form={form} />}
            {formType === "true_false" && <QuizEditorTrueFalse form={form} />}
            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>解説</FormLabel>
                  <FormControl>
                    <Textarea placeholder="解説を入力（任意）" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>公開設定</FormLabel>
                  <label className="flex items-center justify-between rounded-md border px-4 py-3">
                    <div>
                      <div>問題を公開する</div>
                      <FormDescription>
                        非公開にした問題は出題されません
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </label>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button className="ml-auto" variant="secondary" asChild>
                <Link href="/admin/puratto">キャンセル</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting || !isDirty}>
                {isSubmitting && <Spinner />}
                {labels.submit}
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};
