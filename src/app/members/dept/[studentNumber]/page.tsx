type Props = {
  params: Promise<{ studentNumber: string }>;
};

const Page = async ({ params }: Props) => {
  const { studentNumber } = await params;

  return <div>{studentNumber}</div>;
};

export default Page;
