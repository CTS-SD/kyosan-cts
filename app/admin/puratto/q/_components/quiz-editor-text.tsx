import { Controller, type UseFormReturn } from "react-hook-form";
import type z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { QuizEditorSchema } from "@/features/quizzes";
import { FieldHeader, FieldNotice } from "./field-notice";

type Props = {
  form: UseFormReturn<z.infer<typeof QuizEditorSchema>>;
};

export const QuizEditorText = ({ form }: Props) => {
  return (
    <Controller
      name="textAnswer"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldHeader>
            <FieldLabel>解答</FieldLabel>
            <FieldNotice>
              改行区切りで複数パターンの解答を入力できます。いずれかに一致すると正解となります。空白は無視されます。
            </FieldNotice>
          </FieldHeader>
          <Textarea {...field} placeholder={"荒木俊馬\nあらきとしま\n..."} className="bg-background" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
