import { db } from "@/db/db";
import { quizzes } from "@/db/schema";
import Wrapper from "./Wrapper";

const Page = async () => {
  const quizList = await db.select().from(quizzes);

  return (
    <>
      <Wrapper quizList={quizList} />
    </>
  );
};

export default Page;
