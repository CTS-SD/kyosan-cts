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
import { ConfigMap } from "@/lib/config/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  imageUrl: z.url("有効なURLを入力してください。").or(z.literal("")),
});

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  configPromise: Promise<ConfigMap>;
};

export const ImageUrlSetting = ({ configPromise }: Props) => {
  const config = use(configPromise);

  const form = useForm<FormValues>({
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
    <Form {...form}>
      <Setting.Root onSubmit={handleSubmit}>
        <Setting.Header>
          <Setting.Title>画像URL</Setting.Title>
          <Setting.Description>
            スタッフが配属部署一覧を画像として保存できるようにするための参照先を設定します。GoogleDrive等にアップロードした画像の共有可能なURLを指定してください。
          </Setting.Description>
        </Setting.Header>
        <Setting.Body className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="url"
                      inputMode="url"
                      placeholder="https://example.com/image.jpg"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <Button asChild variant="outline" size="icon">
                    <Link
                      href={field.value}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="画像リンクを開く"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
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
    </Form>
  );
};
