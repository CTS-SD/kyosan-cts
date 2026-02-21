"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Setting } from "@/components/ui/setting";
import { Switch } from "@/components/ui/switch";
import { upsertConfigValue } from "@/features/config/actions";

const FormSchema = z.object({
  published: z.boolean(),
});

export const VisibilitySetting = ({ initialPublished }: { initialPublished: boolean }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      published: initialPublished,
    },
  });

  const { isSubmitting } = form.formState;

  const switchId = useId();

  const handleSubmit = form.handleSubmit(async (values) => {
    await upsertConfigValue("departmentAnnouncementsPublished", values.published);
    toast.success("設定を保存しました");
  });

  return (
    <div className="flex items-center gap-3">
      <Setting.Root className="w-full" onSubmit={handleSubmit}>
        <Setting.Header>
          <Setting.Title>配属発表ページを公開</Setting.Title>
          <Setting.Description>
            配属部署発表ページをスタッフ向けに公開するかどうかを設定します。非公開中は管理者のみがアクセスできる状態となります。
          </Setting.Description>
        </Setting.Header>
        <Setting.Body>
          <Controller
            name="published"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-3">
                  <Switch
                    id={switchId}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldLabel htmlFor={switchId}>{field.value ? "公開中" : "非公開"}</FieldLabel>
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </Setting.Body>
        <Setting.Footer>
          <Setting.Actions>
            <Button type="submit" size="sm" disabled={isSubmitting}>
              保存
            </Button>
          </Setting.Actions>
        </Setting.Footer>
      </Setting.Root>
    </div>
  );
};
