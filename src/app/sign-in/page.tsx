import { AdminSignIn } from "@/components/auth/admin-sign-in";
import { MembersSignIn } from "@/components/auth/members-sign-in";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="mx-auto flex max-w-lg flex-col px-6 py-20">
      <div>
        <Tabs defaultValue="member">
          <TabsList>
            <TabsTrigger value="member">キャンスタメンバー</TabsTrigger>
            <TabsTrigger value="admin">管理者</TabsTrigger>
          </TabsList>
          <TabsContent value="member">
            <MembersSignIn />
          </TabsContent>
          <TabsContent value="admin">
            <AdminSignIn />
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-2 flex justify-center">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-foreground/60"
        >
          <Link href="/">
            <ArrowLeftIcon />
            ホームへ戻る
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
