"use client";

import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStudentBundlePromise } from "@/ctx/student-bundle-promise";
import { Student } from "@/lib/db/schema";
import { StudentEditorSchema, StudentValues } from "@/lib/student-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
import { Controller, FormState, useForm } from "react-hook-form";

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
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldSet disabled={isSubmitting}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <FieldLabel>氏名</FieldLabel>
                  <Input {...field} placeholder="京産 花子" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="studentNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <FieldLabel>学籍番号（6桁）</FieldLabel>
                  <Input {...field} placeholder="123456" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="facultyId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>学部</FieldLabel>
                <Select
                  onValueChange={(val) =>
                    field.onChange(Number(val) || undefined)
                  }
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="学部を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map((faculty) => (
                      <SelectItem
                        key={faculty.id}
                        value={faculty.id?.toString()}
                      >
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="departmentId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>配属部署</FieldLabel>
                <Select
                  onValueChange={(val) =>
                    field.onChange(Number(val) || undefined)
                  }
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="部署を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem
                        key={department.id}
                        value={department.id?.toString()}
                      >
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {footerContent?.(form.formState)}
        </FieldSet>
      </form>
    </div>
  );
};
