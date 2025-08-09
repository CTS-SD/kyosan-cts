import { quizFormSchema } from "@/lib/quiz-editor";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

type Props = {
  form: UseFormReturn<z.infer<typeof quizFormSchema>>;
};

const SelectQuizForm = ({ form }: Props) => {
  const formType = form.watch("type");
  if (formType !== "select") return null;
  return (
    <>
      <FormField
        control={form.control}
        name="correctChoicesText"
        render={({ field }) => (
          <FormItem>
            <FormLabel>正解の選択肢</FormLabel>
            <FormControl>
              <Textarea placeholder={"選択肢1\n選択肢2\n..."} {...field} />
            </FormControl>
            <FormDescription>
              改行区切りで複数の正解選択肢を入力できます。
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="incorrectChoicesText"
        render={({ field }) => (
          <FormItem>
            <FormLabel>不正解の選択肢</FormLabel>
            <FormControl>
              <Textarea placeholder={"選択肢1\n選択肢2\n..."} {...field} />
            </FormControl>
            <FormDescription>
              改行区切りで複数の不正解選択肢を入力できます。
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default SelectQuizForm;
