import QuizForm from "../../QuizForm";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

const Page = async () => {
  return (
    <div className="pb-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center py-6">
          <Link
            href="/admin/test"
            className="inline-flex items-center gap-1 font-semibold"
          >
            <ChevronLeftIcon size={20} />
            キャンセル
          </Link>
        </div>
        <QuizForm isEdit={false} />
      </div>
    </div>
  );
};

export default Page;
