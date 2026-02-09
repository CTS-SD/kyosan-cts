"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, use, useContext } from "react";
import { Controller, type FormState, useForm } from "react-hook-form";
import { useStudentBundlePromise } from "../../../hooks/use-student-bundle-promise";
import type { Student } from "../../../lib/db/schema";
import { StudentEditorSchema, type StudentValues } from "../../../lib/student-editor";
import { Button } from "../../ui/button";
import { Field, FieldError, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Spinner } from "../../ui/spinner";

const StudentEditorContext = createContext<{
  form: ReturnType<typeof useForm<StudentValues>>;
} | null>(null);

const useStudentEditor = () => {
  const context = useContext(StudentEditorContext);
  if (!context) throw new Error("useStudentEditor must be used within a StudentEditorProvider");
  return context;
};

export const StudentEditor = ({
  defaultValues,
  onSubmit,
  children,
}: {
  defaultValues?: Partial<Student>;
  onSubmit?: (values: StudentValues) => Promise<void>;
  children: React.ReactNode;
}) => {
  const form = useForm<StudentValues>({
    resolver: zodResolver(StudentEditorSchema),
    defaultValues: {
      name: "",
      studentNumber: "",
      ...defaultValues,
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    const shouldClean = onSubmit ? await onSubmit(values) : false;
    if (shouldClean) {
      form.reset({
        ...values,
        name: "",
        studentNumber: "",
      });
    }
  });

  return (
    <StudentEditorContext.Provider
      value={{
        form,
      }}
    >
      <form onSubmit={handleSubmit} className="contents">
        {children}
      </form>
    </StudentEditorContext.Provider>
  );
};

export const StudentEditorFields = () => {
  const { form } = useStudentEditor();
  const { faculties, departments } = use(useStudentBundlePromise());

  return (
    <FieldSet disabled={form.formState.isSubmitting} className="px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1">
              <FieldLabel>氏名</FieldLabel>
              <Input {...field} placeholder="京産 花子" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
            <Select onValueChange={(val) => field.onChange(Number(val) || undefined)} value={field.value?.toString()}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="学部を選択" />
              </SelectTrigger>
              <SelectContent>
                {faculties.map((faculty) => (
                  <SelectItem key={faculty.id} value={faculty.id?.toString()}>
                    {faculty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="departmentId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>配属部署</FieldLabel>
            <Select onValueChange={(val) => field.onChange(Number(val) || undefined)} value={field.value?.toString()}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="部署を選択" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id?.toString()}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldSet>
  );
};

export const StudentEditorCancel = ({ ...props }: React.ComponentProps<"button">) => {
  const { form } = useStudentEditor();

  return (
    <Button type="button" disabled={form.formState.isSubmitting} variant="ghost" {...props}>
      キャンセル
    </Button>
  );
};

export const StudentEditorSubmit = ({ children, ...props }: React.ComponentProps<"button">) => {
  const { form } = useStudentEditor();

  const disabled = form.formState.isSubmitting || !form.formState.isDirty;

  return (
    <Button type="submit" disabled={disabled} {...props}>
      {form.formState.isSubmitting && <Spinner />}
      {children}
    </Button>
  );
};
