import { AdminUserMenu } from "./admin-user-menu";
import { UserAvatar } from "./user-avatar";

export const AdminUserButton = async () => {
  return (
    <AdminUserMenu>
      <UserAvatar className="size-9" />
    </AdminUserMenu>
  );
};
