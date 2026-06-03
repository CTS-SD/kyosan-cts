"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, use } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components//ui/button";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components//ui/field";
import { Input } from "@/components//ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components//ui/select";
import { Spinner } from "@/components//ui/spinner";
import { UserIcon } from "@/components/icons/user-icon";
import { ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { List, ListItem } from "@/components/ui/list";
import { StudentEditorSchema, type StudentValues } from "@/features/students/editor";
import type { Department, Faculty, Student } from "@/features/students/types";

const StudentEditorContext = createContext<{
  form: ReturnType<typeof useForm<StudentValues>>;
} | null>(null);

const useStudentEditor = () => {
  const context = use(StudentEditorContext);
  if (!context) throw new Error("useStudentEditor must be used within a StudentEditorProvider");
  return context;
};

export const StudentEditor = ({
  defaultValues,
  onSubmit,
  children,
}: {
  defaultValues?: Partial<Student>;
  onSubmit?: (values: StudentValues) => Promise<boolean>;
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
    } else {
      form.reset(values);
    }
  });

  return (
    <StudentEditorContext.Provider value={{ form }}>
      <form onSubmit={handleSubmit} className="contents">
        {children}
      </form>
    </StudentEditorContext.Provider>
  );
};

export const StudentEditorFields = ({
  faculties,
  departments,
}: {
  faculties: Faculty[];
  departments: Department[];
}) => {
  const { form } = useStudentEditor();

  return (
    <FieldSet disabled={form.formState.isSubmitting} className="px-6 pt-6 pb-2">
      <div className="flex items-center gap-4">
        <div className="size-16 overflow-clip rounded-full bg-accent">
          <UserIcon className="size-full" />
        </div>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1 gap-0">
              <FieldLabel className="sr-only">氏名</FieldLabel>
              <Input
                className="-ms-3 grow border-none bg-transparent font-semibold text-2xl! ring-0!"
                {...field}
                placeholder="京産 花子"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <List className="px-0">
        <Controller
          name="studentNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <ListItem>
              <ItemContent>
                <ItemTitle>学籍番号</ItemTitle>
                <ItemDescription>学生の学籍番号6桁を入力してください。</ItemDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </ItemContent>
              <ItemActions>
                <Input className="w-30" {...field} placeholder="123456" />
              </ItemActions>
            </ListItem>
          )}
        />
        <Controller
          name="facultyId"
          control={form.control}
          render={({ field, fieldState }) => (
            <ListItem>
              <ItemContent>
                <ItemTitle>学部</ItemTitle>
                <ItemDescription>所属学部を選択してください。</ItemDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </ItemContent>
              <ItemActions>
                <Select
                  onValueChange={(val) => field.onChange(Number(val) || undefined)}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="学部を選択" />
                  </SelectTrigger>
                  <SelectContent align="end" position="popper">
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id?.toString()}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </ItemActions>
            </ListItem>
          )}
        />
        <Controller
          name="departmentId"
          control={form.control}
          render={({ field, fieldState }) => (
            <ListItem>
              <ItemContent>
                <ItemTitle>配属部署</ItemTitle>
                <ItemDescription>配属部署を選択してください。</ItemDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </ItemContent>
              <ItemActions>
                <Select
                  onValueChange={(val) => field.onChange(Number(val) || undefined)}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="部署を選択" />
                  </SelectTrigger>
                  <SelectContent align="end" position="popper">
                    {departments.map((department) => (
                      <SelectItem key={department.id} value={department.id?.toString()}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </ItemActions>
            </ListItem>
          )}
        />
      </List>
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
