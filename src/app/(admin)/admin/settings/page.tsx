import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import PageHeading from "../PageHeading";
import SettingsItem from "@/components/SettingsItem";
import Image from "next/image";

const Page = async () => {
  const session = await auth();

  return (
    <>
      <PageHeading>設定</PageHeading>
      <div className="flex flex-col gap-2 p-6">
        <SettingsItem>
          <Image
            className="rounded-full size-10"
            src={session?.user?.image ?? ""}
            alt=""
            width={80}
            height={80}
          />
          <div className="font-semibold mt-2">{session?.user?.name}</div>
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
      </div>
    </>
  );
};

export default Page;
