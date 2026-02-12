"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { resetMemberPassword } from "@/lib/auth/actions";
import { Button } from "../../ui/button";
import { Field, FieldError } from "../../ui/field";
import { Input } from "../../ui/input";
import { Setting } from "../../ui/setting";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください。")
    .max(128, "パスワードは128文字以下で入力してください。"),
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
      form.reset();
      toast.success("スタッフ用ログインパスワードをリセットしました");
    } catch {
      toast.error("スタッフ用ログインパスワードのリセットに失敗しました");
    }
  };

  return (
    <Setting.Root onSubmit={form.handleSubmit(handleSubmit)}>
      <Setting.Header>
        <Setting.Title>スタッフ用ログインパスワードを変更</Setting.Title>
        <Setting.Description>
          管理者以外のスタッフがログイン時に使用するパスワードを設定します。変更すると、ログイン中のスタッフは強制的にログアウトされます。管理者アカウントには影響しません。
        </Setting.Description>
      </Setting.Header>
      <Setting.Body className="flex flex-col gap-4">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                placeholder="新しいパスワード"
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
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
  );
};
