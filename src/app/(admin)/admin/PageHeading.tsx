import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  actions?: [
    {
      icon: React.ReactNode;
      href?: string;
      onClick?: () => void;
    }
  ];
};

const PageHeading = ({ children, actions }: Props) => {
  return (
    <div className="border-b">
      <div className="py-10 px-6 font-bold text-2xl max-w-5xl mx-auto bg-white flex items-center">
        <h1>{children}</h1>
        <div className="flex items-center ml-auto">
          {actions?.map((action, i) => {
            const className =
              "p-2 rounded-lg size-12 aspect-square bg-white border text-black grid place-content-center hover:bg-neutral-100";
            return (
              <Button
                asChild
                key={i}
                onClick={action.onClick}
                className={className}
              >
                {action.href ? (
                  <Link href={action.href}>{action.icon}</Link>
                ) : (
                  <div>{action.icon}</div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
