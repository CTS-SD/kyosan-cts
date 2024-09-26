type Props = {
  children: React.ReactNode;
};

const PageHeading = ({ children }: Props) => {
  return (
    <div className="py-10 px-8 font-bold text-2xl border-b bg-white">
      <h1>{children}</h1>
    </div>
  );
};

export default PageHeading;
