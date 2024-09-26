import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  onStart: () => void;
};

const StartPage = ({ onStart }: Props) => {
  return (
    <>
      <Link href="/" className="flex items-center">
        <ChevronLeftIcon />
        戻る
      </Link>
      <div className="border rounded-xl p-4 mt-4 flex flex-col gap-4">
        <h1 className="font-bold text-center">ぷらっとテスト</h1>
        <Button onClick={onStart}>スタート！</Button>
      </div>
    </>
  );
};

export default StartPage;
