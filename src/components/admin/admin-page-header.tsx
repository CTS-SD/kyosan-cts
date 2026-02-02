import { SidebarTrigger } from "../ui/sidebar";

type Props = {
  heading?: React.ReactNode;
  children?: React.ReactNode;
};

export const AdminPageHeader = ({ heading, children }: Props) => {
  return (
    <div className="sticky top-0 z-20 border-b bg-background">
      <div className="mx-auto flex h-10 max-w-6xl items-center gap-1 px-4 md:px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="font-medium text-[13px]">{heading}</div>
        {children}
      </div>
    </div>
  );
};
