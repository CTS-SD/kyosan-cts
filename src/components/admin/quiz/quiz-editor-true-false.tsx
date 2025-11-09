import {
  Field,
  FieldContent,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuizEditorSchema } from "@/lib/quiz/editor";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";

type Props = {
  form: UseFormReturn<z.infer<typeof QuizEditorSchema>>;
};

const options = [
  { label: "○ 正しい", value: "true" },
  { label: "✗ 誤り", value: "false" },
];

export const QuizEditorTrueFalse = ({ form }: Props) => {
  return (
    <Controller
      control={form.control}
      name="trueFalseAnswer"
      render={({ field, fieldState }) => (
        <FieldSet data-invalid={fieldState.invalid}>
          <FieldLabel>解答</FieldLabel>
          <RadioGroup
            name={field.name}
            value={field.value ? "true" : "false"}
            onValueChange={(value) => field.onChange(value === "true")}
            aria-invalid={fieldState.invalid}
          >
            {options.map((option) => (
              <FieldLabel key={option.value}>
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldTitle>{option.label}</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value={option.value}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FieldSet>
      )}
    />
  );
};
