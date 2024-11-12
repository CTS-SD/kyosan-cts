import DepartmentMembers from "../DepartmentMembers";
import { Department, getDepartmentIcon } from "../members";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">配属発表</h1>
      <div>
        <div className="mt-10 flex flex-col items-center gap-6">
          {Object.values(Department).map((department, i) => (
            <DepartmentMembers
              className="animate-appear-spring opacity-0"
              style={{
                animationDelay: `${i * 200}ms`,
              }}
              key={i}
              department={department}
              header={
                <div className="flex items-center justify-center gap-3">
                  <div>{getDepartmentIcon(department, 28)}</div>
                  <div>{department}</div>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
