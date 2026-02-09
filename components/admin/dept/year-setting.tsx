"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useConfigPromise } from "../../../hooks/use-config-promise";
import { upsertConfigValue } from "../../../lib/config/actions";
import { Button } from "../../ui/button";
import { Field, FieldError } from "../../ui/field";
import { Input } from "../../ui/input";
import { Setting } from "../../ui/setting";

const FormSchema = z.object({
  year: z
    .number("年度を入力してください。")
    .int({ message: "整数で入力してください。" })
    .min(2000, { message: "2000以上の値を入力してください。" })
    .max(3000, { message: "3000以下の値を入力してください。" }),
});

export const YearSetting = () => {
  const config = use(useConfigPromise());

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      year: config.departmentAnnouncementsYear,
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = form.handleSubmit(async (values) => {
    await upsertConfigValue("departmentAnnouncementsYear", values.year);
    toast.success("設定を保存しました");
  });

  return (
    <Setting.Root onSubmit={handleSubmit}>
      <Setting.Header>
        <Setting.Title>表示年度</Setting.Title>
        <Setting.Description>配属部署発表ページに表示する年度の値を設定します。</Setting.Description>
      </Setting.Header>
      <Setting.Body className="flex flex-col gap-4">
        <Controller
          name="year"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="number"
                inputMode="numeric"
                placeholder={new Date().getFullYear().toString()}
                disabled={isSubmitting}
                value={field.value}
                onChange={(event) => {
                  const nextValue = event.target.value.trim();
                  if (nextValue === "") {
                    field.onChange("");
                    return;
                  }
                  field.onChange(Number(nextValue));
                }}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
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
  );
};
