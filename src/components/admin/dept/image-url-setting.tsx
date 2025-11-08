"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Setting } from "@/components/ui/setting";
import { useConfigPromise } from "@/ctx/config-promise";
import { upsertConfigValue } from "@/lib/config/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  imageUrl: z.url("有効なURLを入力してください。").or(z.literal("")),
});

export const ImageUrlSetting = () => {
  const config = use(useConfigPromise());

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      imageUrl: config.departmentAnnouncementsImageUrl,
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = form.handleSubmit(async (values) => {
    await upsertConfigValue("departmentAnnouncementsImageUrl", values.imageUrl);
    toast.success("設定を保存しました");
  });

  return (
    <Setting.Root onSubmit={handleSubmit}>
      <Setting.Header>
        <Setting.Title>画像URL</Setting.Title>
        <Setting.Description>
          スタッフが配属部署一覧を画像として保存できるようにするための参照先を設定します。GoogleDrive等にアップロードした画像の共有可能なURLを指定してください。
        </Setting.Description>
      </Setting.Header>
      <Setting.Body className="flex flex-col gap-4">
        <Controller
          name="imageUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex gap-2">
                <Input
                  {...field}
                  type="url"
                  inputMode="url"
                  placeholder="https://example.com/image.jpg"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                />
                <Button
                  render={
                    <Link
                      href={field.value}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="画像リンクを開く"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  }
                  variant="outline"
                  size="icon"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </Setting.Body>
      <Setting.Footer>
        <Setting.Hint>
          空欄の場合、配属部署発表ページに画像リンクは表示されません。
        </Setting.Hint>
        <Setting.Actions>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            保存
          </Button>
        </Setting.Actions>
      </Setting.Footer>
    </Setting.Root>
  );
};
