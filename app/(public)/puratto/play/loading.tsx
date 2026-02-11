import { UserAvatar } from "@/components/user-avatar";

const Loading = () => {
  return (
    <div className="grid h-dvh place-content-center">
      <div className="flex items-center gap-4">
        <UserAvatar />
        <div className="animate-pulse font-accent font-medium">ぷらっとテストを準備中...</div>
      </div>
    </div>
  );
};

export default Loading;
