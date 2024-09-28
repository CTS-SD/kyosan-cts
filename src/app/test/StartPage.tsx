import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import BirdAnimation from "./bird.json";
import { Player } from "@lottiefiles/react-lottie-player";

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
      <div className="border rounded-xl p-6 mt-4 flex flex-col gap-4">
        <h1 className="font-bold text-center text-2xl">ぷらっとテスト</h1>
        <div>
          <Player autoplay loop src={BirdAnimation} className="w-40" />
        </div>
        <Button variant="primary" size="lg" onClick={onStart}>
          スタート
        </Button>
      </div>
    </>
  );
};

export default StartPage;
