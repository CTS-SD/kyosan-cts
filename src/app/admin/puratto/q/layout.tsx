import { QuizPageSkeleton } from "@/components/admin/quiz/quiz-page-skeleton";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <Suspense fallback={<QuizPageSkeleton />}>{children}</Suspense>;
};

export default Layout;
