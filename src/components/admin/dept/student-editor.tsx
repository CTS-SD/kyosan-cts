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
import { useStudentBundlePromise } from "@/ctx/student-bundle-promise-context";
import { Student } from "@/lib/db/schema";
import { StudentEditorSchema, StudentValues } from "@/lib/student-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
import { FormState, useForm } from "react-hook-form";

export type StudentEditorProps = {
  defaultValues?: Partial<Student>;
  footerContent?: (formState: FormState<StudentValues>) => React.ReactNode;
  /**
   * A function ran on the form submitted.
   * @param values The submitted form values
   * @returns If the form should be cleaned or not
   */
  onSubmit?: (values: StudentValues) => Promise<boolean | void>;
};

export const StudentEditor = ({
  defaultValues,
  footerContent,
  onSubmit,
}: StudentEditorProps) => {
  const { faculties, departments } = use(useStudentBundlePromise());

  const form = useForm<StudentValues>({
    resolver: zodResolver(StudentEditorSchema),
    defaultValues: {
      name: "",
      studentNumber: "",
      ...defaultValues,
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values: StudentValues) => {
    const shouldClean = onSubmit ? await onSubmit(values) : false;
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
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset className="space-y-4" disabled={isSubmitting}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
                  <FormItem className="flex-1">
                    <FormLabel>学籍番号（6桁）</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <div className="flex justify-end gap-2">
              {footerContent?.(form.formState)}
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};
