import { Controller, type UseFormReturn } from "react-hook-form";
import type z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { QuizEditorSchema } from "@/features/quizzes";
import { FieldHeader, FieldNotice } from "./field-notice";

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
            <FieldHeader>
              <FieldLabel>正解の選択肢</FieldLabel>
              <FieldNotice>改行区切りで複数の正解選択肢を入力できます。</FieldNotice>
            </FieldHeader>
            <Textarea {...field} placeholder={"選択肢1\n選択肢2\n..."} className="bg-background" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="incorrectChoicesText"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldHeader>
              <FieldLabel>不正解の選択肢</FieldLabel>
              <FieldNotice>改行区切りで複数の不正解選択肢を入力できます。</FieldNotice>
            </FieldHeader>
            <Textarea {...field} placeholder={"選択肢1\n選択肢2\n..."} className="bg-background" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
};
