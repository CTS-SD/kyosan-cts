import { redirect } from "next/navigation";

type Props = {};

const Page = ({}: Props) => {
  redirect("/admin/test");
};

export default Page;
