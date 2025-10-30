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
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { QuizValues } from "@/lib/quiz/editor";
import { quizTypes } from "@/lib/quiz/types";
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
  new: { submit: "作成" },
  edit: { submit: "保存" },
};

export const QuizEditor = ({ form, onSubmit, className, isNew }: Props) => {
  const labels = isNew ? LABELS.new : LABELS.edit;
  const { isSubmitting, isDirty } = form.formState;
  const formType = form.watch("type");

  useNavigationGuard({
    enabled: isDirty && !isSubmitting,
    confirm: () =>
      window.confirm("保存されていない変更があります。ページを離れますか？"),
  });

  const quizTypeItems = quizTypes.map((type) => ({
    label: type.label,
    value: type.id,
  }));

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="space-y-6" disabled={isSubmitting}>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">回答形式</FormLabel>
                  <Select
                    items={quizTypeItems}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectPopup>
                      {quizTypeItems.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectPopup>
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
                  <label className="dark:bg-input/32 flex items-center justify-between rounded-md border px-4 py-3">
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
          </fieldset>
          <div className="to-background bg-background/90 backdrop-blur-xs sticky bottom-0 -mb-4 flex justify-end gap-2 py-4">
            <Button
              render={<Link href="/admin/puratto">キャンセル</Link>}
              className="ml-auto"
              variant="secondary"
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting && <Spinner />}
              {labels.submit}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
