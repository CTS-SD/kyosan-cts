import { cn } from "@/utils/utils";
import {
  Department,
  getDepartmentStyle,
  getMembersByDepartment,
} from "./members";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  department: Department;
  header?: React.ReactNode;
  footer?: React.ReactNode;
} & React.ComponentProps<"div">;

const DepartmentMembers = ({
  department,
  header,
  footer,
  className,
  ...props
}: Props) => {
  const members = getMembersByDepartment(department);

  return (
    <div
      className={cn(
        "w-[min(440px,95vw)] rounded-2xl bg-white px-4 py-6 text-black sm:px-6",
        className,
      )}
      {...props}
    >
      <div className="text-center text-2xl font-bold">{header}</div>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {members.map((m) => {
          return (
            <div
              className={cn(
                "rounded-full px-6 pb-1.5 pt-2 text-center text-base font-semibold text-white shadow-lg",
                getDepartmentStyle(department),
              )}
            >
              <div className="leading-none">{m.name}</div>
              <div className="text-xs opacity-70">{m.major}学部</div>
            </div>
          );
        })}
      </div>
      {footer}
    </div>
  );
};

export default DepartmentMembers;
