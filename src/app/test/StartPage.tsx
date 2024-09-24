type Props = {
  onStart: () => void;
};

const StartPage = ({ onStart }: Props) => {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-4">
      <h1 className="font-bold text-center">ぷらっとテスト</h1>
      <button
        onClick={onStart}
        className="p-4 flex justify-center font-bold bg-blue-600 text-white rounded-full"
      >
        スタート！
      </button>
    </div>
  );
};

export default StartPage;
