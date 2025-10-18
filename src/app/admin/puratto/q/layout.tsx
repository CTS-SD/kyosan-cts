import { QuizPageFallback } from "@/components/admin/quiz/quiz-page-fallback";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <Suspense fallback={<QuizPageFallback />}>{children}</Suspense>;
};

export default Layout;
