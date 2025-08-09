"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuizFormValues, quizTypes } from "@/lib/quiz-form";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import SelectQuizForm from "./select-quiz-form";
import TextQuizForm from "./text-quiz-form";
import TrueFalseQuizForm from "./true-false-quiz-form";

type Props = {
  form: UseFormReturn<QuizFormValues>;
  onSubmit: (values: QuizFormValues) => void;
  className?: string;
};

const QuizForm = ({ form, onSubmit, className }: Props) => {
  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>形式</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="形式を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {quizTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>問題文</FormLabel>
                <FormControl>
                  <Textarea placeholder="問題文を入力" {...field} />
                </FormControl>
                <FormDescription>
                  <Link
                    className="text-blue-500"
                    target="_blank"
                    href="https://qiita.com/kamorits/items/6f342da395ad57468ae3"
                  >
                    マークダウン記法
                  </Link>
                  を利用できます。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <SelectQuizForm form={form} />
          <TextQuizForm form={form} />
          <TrueFalseQuizForm form={form} />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>解説</FormLabel>
                <FormControl>
                  <Textarea placeholder="解説を入力（任意）" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem>
                <FormLabel>公開設定</FormLabel>
                <label className="flex items-center px-4 py-3 border rounded-md justify-between">
                  <div>
                    <div>問題を公開する</div>
                    <FormDescription>
                      非公開にした問題は出題されません
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </label>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit">保存</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QuizForm;
