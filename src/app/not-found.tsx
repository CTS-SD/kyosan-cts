import Link from "next/link";

const NotFound = () => {
  return (
    <div className="grid min-h-[100dvh] place-content-center">
      <div className="flex flex-col items-center pt-10">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="font-semibold">ページが見つかりませんでした</p>
        <Link href="/" className="mt-10 block w-fit text-gray-400">
          トップページへ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
