import { cn } from "@/utils/utils";
import { Department, getMembersByDepartment } from "./members";

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
        "w-[min(440px,95vw)] rounded-2xl bg-white p-6 text-black",
        className,
      )}
      {...props}
    >
      <div className="text-center text-2xl font-bold">{header}</div>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {members.map((m) => {
          return (
            <div
              key={m.id}
              className="rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 px-4 py-2 text-lg font-semibold text-white shadow-lg"
            >
              {m.name}
            </div>
          );
        })}
      </div>
      {footer}
    </div>
  );
};

export default DepartmentMembers;
