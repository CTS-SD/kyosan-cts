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

const TextQuizForm = ({ form }: Props) => {
  const formType = form.watch("type");
  if (formType !== "text") return null;
  return (
    <>
      <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>解答</FormLabel>
            <FormControl>
              <Textarea
                placeholder={"荒木俊馬\nあらきとしま\n..."}
                value={typeof field.value === "string" ? field.value : ""}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                name={field.name}
                disabled={field.disabled}
                ref={field.ref}
              />
            </FormControl>
            <FormDescription>
              改行区切りで複数パターンの解答を入力でき、いずれか一つに一致すると正解となります。空白は無視されます。
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TextQuizForm;
