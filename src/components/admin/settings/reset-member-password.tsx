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
import { resetMemberPassword } from "@/lib/auth/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, "パスワードは8文字以上である必要があります")
    .max(128, "パスワードは128文字以下である必要があります"),
});

type FormValues = z.infer<typeof FormSchema>;

export const ResetMemberPassword = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values: FormValues) => {
    try {
      await resetMemberPassword({
        newPassword: values.password,
      });
      toast.success("スタッフ用ログインパスワードをリセットしました");
    } catch {
      toast.error("スタッフ用ログインパスワードのリセットに失敗しました");
    }
  };

  return (
    <Form {...form}>
      <Setting.Root onSubmit={form.handleSubmit(handleSubmit)}>
        <Setting.Header>
          <Setting.Title>スタッフ用ログインパスワードを変更</Setting.Title>
          <Setting.Description>
            管理者以外のスタッフがログイン時に使用するパスワードを設定します。変更すると、ログイン中のスタッフは強制的にログアウトされます。管理者アカウントには影響しません。
          </Setting.Description>
        </Setting.Header>
        <Setting.Body className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="新しいパスワード"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Setting.Body>
        <Setting.Footer>
          <Setting.Hint>8~128文字のパスワードを設定できます。</Setting.Hint>
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
