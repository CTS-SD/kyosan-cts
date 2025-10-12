"use client";

import { RichTextRenderer } from "@/components/rich-text-renderer";
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
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { QuizValues, quizTypes } from "@/lib/quiz/editor";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { QuizEditorSelect } from "./quiz-editor-select";
import { QuizEditorText } from "./quiz-editor-text";
import { QuizEditorTrueFalse } from "./quiz-editor-true-false";

type Props = {
  form: UseFormReturn<QuizValues>;
  onSubmit: (values: QuizValues) => Promise<void>;
  className?: string;
  labels?: {
    submit?: string;
  };
};

export const QuizEditor = ({
  form,
  onSubmit,
  className,
  labels = { submit: "保存" },
}: Props) => {
  const { isSubmitting, isSubmitted, isDirty } = form.formState;
  const formType = form.watch("type");

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
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>問題文</FormLabel>
                  <FormControl>
                    <RichTextRenderer
                      className="dark:bg-input/30 rounded-md border bg-transparent shadow-xs *:px-3 *:py-2"
                      content={field.value}
                      onUpdate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>回答形式</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="形式を選択" />
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
              <Button variant="secondary" asChild>
                <Link href="/admin/puratto">キャンセル</Link>
              </Button>
              <Button type="submit" disabled={!isDirty || isSubmitted}>
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
