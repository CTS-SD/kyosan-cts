"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { QuizValues } from "@/lib/quiz/editor";
import { quizTypes } from "@/lib/quiz/types";
import { useNavigationGuard } from "next-navigation-guard";
import Link from "next/link";
import { Controller, UseFormReturn } from "react-hook-form";
import { QuizEditorSelect } from "./quiz-editor-select";
import { QuizEditorText } from "./quiz-editor-text";
import { QuizEditorTrueFalse } from "./quiz-editor-true-false";

type Props = {
  form: UseFormReturn<QuizValues>;
  onSubmit: (values: QuizValues) => void;
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
    confirm: () => window.confirm("保存されていない変更があります。ページを離れますか？"),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
      <FieldGroup>
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="sr-only">回答形式</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {quizTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError />}
            </Field>
          )}
        />
        <Controller
          name="question"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>問題文</FieldLabel>
              <Textarea {...field} placeholder="問題文を入力" />
              {fieldState.invalid && <FieldError />}
            </Field>
          )}
        />
        {formType === "select" && <QuizEditorSelect form={form} />}
        {formType === "text" && <QuizEditorText form={form} />}
        {formType === "true_false" && <QuizEditorTrueFalse form={form} />}
        <Controller
          name="explanation"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>解説</FieldLabel>
              <Textarea {...field} value={field.value ?? ""} placeholder="解説を入力（任意）" />
              {fieldState.invalid && <FieldError />}
            </Field>
          )}
        />
        <Controller
          name="isPublished"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="publish">問題を公開する</FieldLabel>
                <FieldDescription>非公開にした問題は出題されません</FieldDescription>
              </FieldContent>
              <Switch id="publish" checked={field.value} onCheckedChange={field.onChange} />
              {fieldState.invalid && <FieldError />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="to-background bg-background/90 sticky bottom-0 -mb-4 flex justify-end gap-2 py-4 backdrop-blur-xs">
        <Button className="ml-auto" variant="secondary" disabled={isSubmitting} asChild>
          <Link href="/admin/puratto">キャンセル</Link>
        </Button>
        <Button type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting && <Spinner />}
          {labels.submit}
        </Button>
      </div>
    </form>
  );
};
