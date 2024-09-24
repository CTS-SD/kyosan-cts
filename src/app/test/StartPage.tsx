import { Button } from "@/components/ui/button";

type Props = {
  onStart: () => void;
};

const StartPage = ({ onStart }: Props) => {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-4">
      <h1 className="font-bold text-center">ぷらっとテスト</h1>
      <Button onClick={onStart}>スタート！</Button>
    </div>
  );
};

export default StartPage;
