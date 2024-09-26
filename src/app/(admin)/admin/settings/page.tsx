import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

type Props = {};

const Page = async ({}: Props) => {
  const session = await auth();

  return (
    <div className="flex flex-col gap-2 p-4">
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

type SettingsItemProps = {
  children: React.ReactNode;
};

const SettingsItem = ({ children }: SettingsItemProps) => {
  return <div className="flex border rounded-xl p-4 gap-4">{children}</div>;
};

export default Page;
