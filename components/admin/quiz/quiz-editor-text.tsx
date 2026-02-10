import { Controller, type UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { QuizEditorSchema } from "../../../lib/quiz";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../ui/field";
import { Textarea } from "../../ui/textarea";

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
          <FieldLabel>解答</FieldLabel>
          <Textarea {...field} placeholder={"荒木俊馬\nあらきとしま\n..."} className="bg-background" />
          <FieldDescription>
            改行区切りで複数パターンの解答を入力でき、いずれか一つに一致すると正解となります。空白は無視されます。
          </FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
