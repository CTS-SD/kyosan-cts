"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Setting } from "@/components/ui/setting";
import { useConfigPromise } from "@/hooks/use-config-promise";
import { upsertConfigValue } from "@/lib/config/actions";

const FormSchema = z.object({
  count: z
    .number("出題問題数を入力してください")
    .min(1, "1以上の値を入力してください")
    .max(100, "100以下の値を入力してください"),
});

export const QuestionCountSetting = () => {
  const config = use(useConfigPromise());

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      count: config.purattoTestQuestionCount,
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = form.handleSubmit(async (data) => {
    await upsertConfigValue("purattoTestQuestionCount", data.count);
    toast.success("設定を保存しました");
  });

  return (
    <Setting.Root onSubmit={handleSubmit}>
      <Setting.Header>
        <Setting.Title>出題問題数</Setting.Title>
        <Setting.Description>ぷらっとテストで出題する問題数を設定します。</Setting.Description>
      </Setting.Header>
      <Setting.Body>
        <Controller
          name="count"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
                type="number"
                placeholder="5"
                disabled={isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </Setting.Body>
      <Setting.Footer>
        <Setting.Actions>
          <Button size="sm" type="submit" disabled={isSubmitting}>
            保存
          </Button>
        </Setting.Actions>
      </Setting.Footer>
    </Setting.Root>
  );
};
