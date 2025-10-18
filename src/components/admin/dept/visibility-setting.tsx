"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Setting } from "@/components/ui/setting";
import { Switch } from "@/components/ui/switch";
import { upsertConfigValue } from "@/lib/config/actions";
import { ConfigMap } from "@/lib/config/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  published: z.boolean(),
});

type Props = {
  configPromise: Promise<ConfigMap>;
};

export const VisibilitySetting = ({ configPromise }: Props) => {
  const config = use(configPromise);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      published: config.departmentAnnouncementsPublished,
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = form.handleSubmit(async (values) => {
    await upsertConfigValue(
      "departmentAnnouncementsPublished",
      values.published,
    );
    toast.success("設定を保存しました");
  });

  return (
    <div className="flex items-center gap-3">
      <Form {...form}>
        <Setting.Root className="w-full" onSubmit={handleSubmit}>
          <Setting.Header>
            <Setting.Title>配属発表ページを公開</Setting.Title>
            <Setting.Description>
              配属部署発表ページをスタッフ向けに公開するかどうかを設定します。非公開中は管理者のみがアクセスできる状態となります。
            </Setting.Description>
          </Setting.Header>
          <Setting.Body>
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Switch
                        id="visibility-toggle"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <Label htmlFor="visibility-toggle">
                      {field.value ? "公開中" : "非公開"}
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
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
      </Form>
    </div>
  );
};
