"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Setting } from "@/components/ui/setting";
import { upsertConfigValue } from "@/lib/config/actions";
import { useConfig } from "@/providers/config-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  year: z
    .number("年度を入力してください。")
    .int({ message: "整数で入力してください。" })
    .min(2000, { message: "2000以上の値を入力してください。" })
    .max(3000, { message: "3000以下の値を入力してください。" }),
});

type FormValues = z.infer<typeof FormSchema>;

export const YearSetting = () => {
  const [year] = useConfig("departmentAnnouncementsYear");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      year,
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = form.handleSubmit(async (values) => {
    await upsertConfigValue("departmentAnnouncementsYear", values.year);
    toast.success("設定を保存しました");
  });

  return (
    <Form {...form}>
      <Setting.Root onSubmit={handleSubmit}>
        <Setting.Header>
          <Setting.Title>表示年度</Setting.Title>
          <Setting.Description>
            配属部署発表ページに表示する年度の値を設定します。
          </Setting.Description>
        </Setting.Header>
        <Setting.Body className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder={new Date().getFullYear().toString()}
                    disabled={isSubmitting}
                    {...field}
                    value={field.value}
                    onChange={(event) => {
                      const nextValue = event.target.value.trim();
                      if (nextValue === "") {
                        field.onChange("");
                        return;
                      }
                      field.onChange(Number(nextValue));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Setting.Body>
        <Setting.Footer>
          <Setting.Hint>4桁の数値を入力してください。</Setting.Hint>
          <Setting.Actions>
            <Button type="submit" size="sm" disabled={isSubmitting}>
              保存
            </Button>
          </Setting.Actions>
        </Setting.Footer>
      </Setting.Root>
    </Form>
  );
};
