"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Student } from "@/lib/db/schema";
import { StudentEditorSchema, StudentValues } from "@/lib/student-editor";
import { useDeptStore } from "@/providers/dept-store-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type StudentEditorProps = {
  defaultValues?: Partial<Student>;
  footerContent?: React.ReactNode;
  /**
   * A function ran on the form submitted.
   * @param values The submitted form values
   * @returns If the form should be cleaned or not
   */
  onSubmit: (values: StudentValues) => Promise<boolean | void>;
};

export const StudentEditor = ({
  defaultValues,
  footerContent,
  onSubmit,
}: StudentEditorProps) => {
  const { faculties, departments } = useDeptStore((store) => store);

  const form = useForm<StudentValues>({
    resolver: zodResolver(StudentEditorSchema),
    defaultValues: {
      name: "",
      studentNumber: "",
      ...defaultValues,
    },
  });

  const handleSubmit = async (values: StudentValues) => {
    const shouldClean = (await onSubmit(values)) === true;
    if (shouldClean) {
      form.reset({
        name: "",
        studentNumber: "",
        facultyId: undefined,
        departmentId: undefined,
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>氏名</FormLabel>
                <FormControl>
                  <Input placeholder="京産 花子" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学籍番号（6桁）</FormLabel>
                <FormControl>
                  <Input placeholder="123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facultyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学部</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={
                    field.value > 0 ? String(field.value) : undefined
                  }
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="学部を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty.id} value={String(faculty.id)}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>配属部署</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={
                    field.value > 0 ? String(field.value) : undefined
                  }
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="配属部署を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem
                        key={department.id}
                        value={String(department.id)}
                      >
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-end">{footerContent}</div>
        </form>
      </Form>
    </div>
  );
};
