import Link from "next/link";

type Props = {};

const Page = ({}: Props) => {
  return (
    <main className="p-4">
      <div className="border rounded-xl p-4 flex flex-col gap-4">
        <h1 className="font-bold text-center">ぷらっとテスト</h1>
        <Link
          href="/test"
          className="p-4 flex justify-center font-bold bg-blue-600 text-white rounded-full"
        >
          テスト開始
        </Link>
      </div>
    </main>
  );
};

export default Page;
