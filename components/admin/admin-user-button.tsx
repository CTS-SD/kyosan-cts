import { UserAvatar } from "../user-avatar";
import { AdminUserMenu } from "./admin-user-menu";

export const AdminUserButton = async () => {
  return (
    <AdminUserMenu>
      <UserAvatar className="size-9" />
    </AdminUserMenu>
  );
};
