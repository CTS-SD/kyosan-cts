import { Controller, type UseFormReturn } from "react-hook-form";
import type z from "zod";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { QuizEditorSchema } from "@/lib/quiz/editor";

type Props = {
  form: UseFormReturn<z.infer<typeof QuizEditorSchema>>;
};

export const QuizEditorSelect = ({ form }: Props) => {
  return (
    <>
      <Controller
        control={form.control}
        name="correctChoicesText"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>正解の選択肢</FieldLabel>
            <Textarea {...field} placeholder={"選択肢1\n選択肢2\n..."} />
            <FieldDescription>改行区切りで複数の正解選択肢を入力できます。</FieldDescription>
            {fieldState.invalid && <FieldError />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="incorrectChoicesText"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>不正解の選択肢</FieldLabel>
            <Textarea {...field} placeholder={"選択肢1\n選択肢2\n..."} />
            <FieldDescription>改行区切りで複数の不正解選択肢を入力できます。</FieldDescription>
            {fieldState.invalid && <FieldError />}
          </Field>
        )}
      />
    </>
  );
};
