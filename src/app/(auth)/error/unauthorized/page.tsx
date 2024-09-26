import { SettingsItem } from "@/app/(admin)/admin/settings/page";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import { TriangleAlertIcon } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {};

const Page = async ({}: Props) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="p-4">
      <div className="flex mb-4 flex-col items-center gap-4 p-6 bg-red-50 text-red-500 border-red-300 border-2 rounded-2xl">
        <TriangleAlertIcon size={64} />
        <p className="font-bold">現在ログイン中のアカウントには管理者ページへのアクセス権限がありません。</p>
      </div>
      <SettingsItem>
        <img
          className="rounded-full size-10"
          src={session?.user?.image ?? ""}
          alt=""
        />
        <div className="font-semibold mt-2">{session?.user?.name}</div>
        <form
          className="ml-auto"
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button size="sm" variant="outline">
            ログアウト
          </Button>
        </form>
      </SettingsItem>
    </div>
  );
};

export default Page;
