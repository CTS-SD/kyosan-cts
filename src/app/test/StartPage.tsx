import { Button } from "@/components/ui/button";
import BirdAnimation from "./bird.json";
import { Player } from "@lottiefiles/react-lottie-player";

type Props = {
  onStart: () => void;
};

const StartPage = ({ onStart }: Props) => {
  return (
    <div className="mt-4 flex flex-col gap-4 rounded-xl border p-6">
      <h1 className="text-center text-2xl font-bold">ぷらっとテスト</h1>
      <div>
        <Player autoplay loop src={BirdAnimation} className="w-40" />
      </div>
      <Button variant="primary" size="lg" onClick={onStart}>
        スタート
      </Button>
    </div>
  );
};

export default StartPage;
