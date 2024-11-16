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
            <Popover key={m.id}>
              <PopoverTrigger>
                <div
                  className={cn(
                    "rounded-full px-4 py-2 text-lg font-semibold text-white shadow-lg",
                    getDepartmentStyle(department),
                  )}
                >
                  {m.name}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-fit rounded-2xl px-4 py-2 font-semibold">
                {m.major}学部
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
      {footer}
    </div>
  );
};

export default DepartmentMembers;
