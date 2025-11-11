import { Progress } from "../ui/progress";

type Props = {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  progress: number;
};

export const QuizPlayHeader = ({ startContent, endContent, progress }: Props) => {
  return (
    <div className="bg-background sticky top-0 flex h-12 shrink-0 items-center gap-2 px-4">
      {startContent}
      <div className="grow">
        <Progress value={progress} className="w-full" />
      </div>
      {endContent}
    </div>
  );
};
