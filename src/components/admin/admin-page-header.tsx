import { SidebarTrigger } from "../ui/sidebar";

type Props = {
  heading?: React.ReactNode;
  children?: React.ReactNode;
};

export const AdminPageHeader = ({ heading, children }: Props) => {
  return (
    <div className="border-b sticky top-0 bg-background z-20">
      <div className="mx-auto flex h-10 max-w-5xl items-center gap-2 px-4 md:px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="text-[13px] font-medium">{heading}</div>
        {children}
      </div>
    </div>
  );
};
