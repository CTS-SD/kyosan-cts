import { SpeechBubble } from "@/components/ui/speech-bubble";
import { UserAvatar } from "@/features/auth/components/user-avatar";

const Loading = () => {
  return (
    <div className="grid h-dvh place-content-center">
      <div className="flex gap-2">
        <UserAvatar className="mt-4" />
        <SpeechBubble className="animate-pulse font-accent font-medium">読み込み中...</SpeechBubble>
      </div>
    </div>
  );
};

export default Loading;
