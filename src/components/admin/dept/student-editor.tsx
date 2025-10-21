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
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStudentBundlePromise } from "@/ctx/student-bundle-promise";
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
      departmentId: 0,
      facultyId: 0,
      ...defaultValues,
    },
  });

  const { isSubmitting } = form.formState;

  const facultyItems = [
    { label: "学部を選択", value: 0 },
    ...faculties.map((fac) => ({
      label: fac.name,
      value: fac.id,
    })),
  ];

  const departmentItems = [
    { label: "部署を選択", value: 0 },
    ...departments.map((dept) => ({
      label: dept.name,
      value: dept.id,
    })),
  ];

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
                    items={facultyItems}
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectPopup>
                      {facultyItems.map((faculty) => (
                        <SelectItem key={faculty.value} value={faculty.value}>
                          {faculty.label}
                        </SelectItem>
                      ))}
                    </SelectPopup>
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
                    items={departmentItems}
                    onValueChange={(val) => field.onChange(val)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectPopup>
                      {departmentItems.map((department) => (
                        <SelectItem
                          key={department.value}
                          value={department.value}
                        >
                          {department.label}
                        </SelectItem>
                      ))}
                    </SelectPopup>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {footerContent?.(form.formState)}
          </fieldset>
        </form>
      </Form>
    </div>
  );
};
