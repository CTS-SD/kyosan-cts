import { ValidationError } from "@tanstack/react-form";
import { AlertCircleIcon } from "lucide-react";

type Props = {
  errors?: ValidationError[];
};

const FieldError = ({ errors }: Props) => {
  if (!errors || errors?.length === 0) return null;
  return (
    <div className="text-red-500 mt-1 flex items-center gap-1">
      <AlertCircleIcon size={14} />
      <div className="text-sm">{String(errors).split(",")[0]}</div>
    </div>
  );
};

export default FieldError;
