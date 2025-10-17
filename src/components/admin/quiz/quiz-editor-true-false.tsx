import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuizEditorSchema } from "@/lib/quiz/editor";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  form: UseFormReturn<z.infer<typeof QuizEditorSchema>>;
};

export const QuizEditorTrueFalse = ({ form }: Props) => {
  return (
    <>
      <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>解答</FormLabel>
            <FormControl>
              <RadioGroup
                value={
                  typeof field.value === "boolean"
                    ? field.value
                      ? "true"
                      : "false"
                    : undefined
                }
                onValueChange={(v) => field.onChange(v === "true")}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-y-0 space-x-3">
                  <FormControl>
                    <RadioGroupItem value="true" />
                  </FormControl>
                  <FormLabel className="font-normal">○ 正しい</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-y-0 space-x-3">
                  <FormControl>
                    <RadioGroupItem value="false" />
                  </FormControl>
                  <FormLabel className="font-normal">✗ 誤り</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
