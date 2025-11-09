import { SidebarTrigger } from "../ui/sidebar";

type Props = {
  heading?: React.ReactNode;
  children?: React.ReactNode;
};

export const AdminPageHeader = ({ heading, children }: Props) => {
  return (
    <div className="bg-background sticky top-0 z-20 border-b">
      <div className="mx-auto flex h-10 max-w-6xl items-center gap-1 px-4 md:px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="text-[13px] font-medium">{heading}</div>
        {children}
      </div>
    </div>
  );
};
