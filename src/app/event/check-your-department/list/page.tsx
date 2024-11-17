import Link from "next/link";
import DepartmentMembers from "../DepartmentMembers";
import {
  Department,
  getDepartmentIcon,
  getDepartmentStyle,
  getMembersByDepartment,
} from "../members";
import { Divide, ImageIcon } from "lucide-react";
import { cn } from "@/utils/utils";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-bold">配属発表</h1>
      </div>
      <div>
        <div className="mt-10 flex flex-col items-center gap-4">
          {Object.values(Department).map((department, i) => (
            <DepartmentMembers
              key={i}
              className="animate-appear-spring opacity-0"
              style={{
                animationDelay: `${i * 200}ms`,
              }}
              department={department}
              header={
                <div className="flex items-center justify-center gap-3">
                  <div className={cn("text-neutral-500")}>
                    {getDepartmentIcon(department, 28)}
                  </div>
                  <div
                    className={cn(
                      "bg-clip-text text-transparent",
                      getDepartmentStyle(department),
                    )}
                  >
                    {department}部署
                  </div>
                  <div className="text-base text-neutral-400">
                    {getMembersByDepartment(department).length}名
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>
      <div className="py-10">
        <Link
          href={process.env.NEXT_PUBLIC_NEW_MEMBERS_2024_IMAGE_URL ?? ""}
          target="_blank"
          className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-black/40 px-4 py-2 text-sm text-white/90"
        >
          <ImageIcon size={16} />
          画像として表示
        </Link>
      </div>
    </div>
  );
};

export default Page;
