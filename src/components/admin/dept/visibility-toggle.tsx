import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { upsertConfigValue } from "@/lib/config/actions";
import { useConfig } from "@/providers/config-provider";
import { useTransition } from "react";

export const VisibilityToggle = () => {
  const [published, setPublished] = useConfig(
    "departmentAnnouncementsPublished",
  );

  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    const newValue = !published;
    setPublished(newValue);
    startTransition(async () => {
      await upsertConfigValue("departmentAnnouncementsPublished", newValue);
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Switch
        id="visibility-toggle"
        checked={published}
        onCheckedChange={handleToggle}
        disabled={isPending}
      />
      <Label htmlFor="visibility-toggle">配属発表ページを公開</Label>
    </div>
  );
};
