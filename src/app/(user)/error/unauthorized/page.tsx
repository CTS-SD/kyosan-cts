import SettingsItem from "@/components/SettingsItem";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import { TriangleAlertIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";

type Props = {};

const Page = async ({}: Props) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-lg p-4">
      <div className="mb-4 flex flex-col items-center gap-4 rounded-2xl border-2 border-red-300 bg-red-50 p-6 text-red-500">
        <TriangleAlertIcon size={64} />
        <p className="font-bold">管理者ページへのアクセス権限がありません。</p>
      </div>
      <SettingsItem>
        <Image
          className="size-10 rounded-full"
          src={session?.user?.image ?? ""}
          alt=""
          width={80}
          height={80}
        />
        <div className="mt-2 font-semibold">{session?.user?.name}</div>
        <form
          className="ml-auto"
          action={async () => {
            "use server";
            await signOut({
              redirectTo: "/",
            });
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
