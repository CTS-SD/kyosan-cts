import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  heading: React.ReactNode;
  href?: string;
  actions?: [
    {
      icon: React.ReactNode;
      href?: string;
      onClick?: () => void;
    },
  ];
};

const PageHeading = ({ heading, href, actions }: Props) => {
  return (
    <div className="border-b">
      <div className="relative mx-auto flex max-w-5xl items-center bg-white px-6 py-10 text-2xl font-bold">
        <h1>{href ? <Link href={href}>{heading}</Link> : heading}</h1>
        <div className="absolute right-6 ml-auto flex items-center">
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
