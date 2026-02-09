import { getUser } from "../../lib/auth/actions";
import { Button } from "../ui/button";
import { UserAvatar } from "../user-avatar";
import { AdminUserMenu } from "./admin-user-menu";

export const AdminUserButton = async () => {
  const user = await getUser();
  if (!user) return null;

  return (
    <AdminUserMenu>
      <Button className="size-9 rounded-full" size="icon" variant="ghost" aria-label="ユーザーメニューを開く">
        <UserAvatar className="size-7" user={user} />
      </Button>
    </AdminUserMenu>
  );
};
