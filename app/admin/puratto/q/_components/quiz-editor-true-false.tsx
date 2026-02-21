import { CircleIcon, XIcon } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";
import type z from "zod";
import { Field, FieldContent, FieldLabel, FieldSet, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { QuizEditorSchema } from "@/features/quiz";

type Props = {
  form: UseFormReturn<z.infer<typeof QuizEditorSchema>>;
};

const answerOptions = [
  {
    icon: CircleIcon,
    label: "正しい",
    value: "true",
  },
  {
    icon: XIcon,
    label: "誤り",
    value: "false",
  },
] as const;

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
            className="flex"
          >
            {answerOptions.map((option) => (
              <FieldLabel key={option.value} className="bg-background">
                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldTitle>
                      <option.icon className="size-4" />
                      {option.label}
                    </FieldTitle>
                  </FieldContent>
                  <RadioGroupItem value={option.value} aria-invalid={fieldState.invalid} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FieldSet>
      )}
    />
  );
};
