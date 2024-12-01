import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import PageHeading from "../PageHeading";
import SettingsItem from "@/components/SettingsItem";
import Image from "next/image";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

const Page = async () => {
  const session = await auth();

  return (
    <>
      <PageHeading heading="設定" href="/admin/settings" />
      <div className="mx-auto flex max-w-lg flex-col gap-4 p-6">
        <SettingsItem>
          <Image
            className="size-10 rounded-full"
            src={session?.user?.image ?? ""}
            alt=""
            width={80}
            height={80}
          />
          <div className="font-semibold">{session?.user?.name}</div>
          <form
            className="ml-auto"
            action={async () => {
              "use server";
              await signOut({
                redirectTo: "/signin",
              });
            }}
          >
            <Button size="sm" variant="outline">
              ログアウト
            </Button>
          </form>
        </SettingsItem>
        <SettingsItem>
          <div className="text-sm font-semibold">サイト管理</div>
          <Link
            href="https://vercel.com/kyosan-cts/kyosan-cts"
            className="ml-auto flex items-center gap-1.5 text-neutral-400 transition-colors hover:text-black"
            target="_blank"
          >
            Vercel
            <ExternalLinkIcon size={16} />
          </Link>
        </SettingsItem>
        <SettingsItem>
          <div className="text-sm font-semibold">データベース</div>
          <Link
            href="https://supabase.com/dashboard/project/lbefyeouwvwjuupbyilb"
            className="ml-auto flex items-center gap-1.5 text-neutral-400 transition-colors hover:text-black"
            target="_blank"
          >
            Supabase
            <ExternalLinkIcon size={16} />
          </Link>
        </SettingsItem>
      </div>
    </>
  );
};

export default Page;
