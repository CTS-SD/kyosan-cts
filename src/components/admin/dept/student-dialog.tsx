import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StudentEditor, StudentEditorProps } from "./student-editor";

type Props = {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
} & StudentEditorProps;

export const StudentDialog = ({
  children,
  title,
  description,
  open,
  setOpen,
  ...editorProps
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>
          <StudentEditor {...editorProps} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
