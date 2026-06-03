"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import { createContext, use } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components//ui/button";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components//ui/field";
import { Input } from "@/components//ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components//ui/select";
import { Spinner } from "@/components//ui/spinner";
import { UserIcon } from "@/components/icons/user-icon";
import { ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { ListItem } from "@/components/ui/list";
import { StudentEditorSchema, type StudentValues } from "@/features/students/editor";
import type { Department, Faculty } from "@/features/students/types";
import { cn } from "@/lib/utils";

export type StudentEditorForm = ReturnType<typeof useForm<StudentValues>>;

export type StudentEditorContextValue = {
  state: {
    form: StudentEditorForm;
    departments: Department[];
    faculties: Faculty[];
  };
  actions: {
    submit: (state: { values: StudentValues; form: StudentEditorForm }) => Promise<void>;
    delete?: () => Promise<void>;
  };
};

const StudentEditorContext = createContext<StudentEditorContextValue | null>(null);

const useStudentEditor = () => {
  const context = use(StudentEditorContext);
  if (!context) throw new Error("useStudentEditor must be used within a StudentEditorProvider");
  return context;
};

export type StudentEditorProviderProps = {
  defaultValues?: Partial<StudentValues>;
  departments: Department[];
  faculties: Faculty[];
  actions: StudentEditorContextValue["actions"];
  children: React.ReactNode;
};

const StudentEditorProvider = ({
  defaultValues,
  departments,
  faculties,
  actions,
  children,
}: StudentEditorProviderProps) => {
  const form = useForm<StudentValues>({
    resolver: zodResolver(StudentEditorSchema),
    defaultValues: {
      name: "",
      studentNumber: "",
      ...defaultValues,
    },
  });

  return (
    <StudentEditorContext value={{ state: { form, departments, faculties }, actions }}>{children}</StudentEditorContext>
  );
};

export const StudentEditorFrame = ({ className, ...props }: React.ComponentProps<"form">) => {
  const {
    state: { form },
    actions: { submit },
  } = useStudentEditor();

  const handleSubmit = form.handleSubmit(async (values) => {
    await submit({ values, form });
  });

  return <form onSubmit={handleSubmit} className={cn("contents", className)} {...props}></form>;
};

export const StudentEditorFieldSet = ({ className, ...props }: React.ComponentProps<"fieldset">) => {
  const {
    state: { form },
  } = useStudentEditor();

  return <FieldSet disabled={form.formState.isSubmitting} className={cn("px-6 pt-6 pb-2", className)} {...props} />;
};

const StudentEditorHero = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("flex items-center gap-4", className)} {...props}></div>;
};

const StudentEditorAvatar = () => {
  return (
    <div className="size-16 overflow-clip rounded-full bg-accent">
      <UserIcon className="size-full" />
    </div>
  );
};

const StudentEditorNameField = () => {
  const {
    state: { form },
  } = useStudentEditor();

  return (
    <Controller
      name="name"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="flex-1 gap-0">
          <FieldLabel className="sr-only">氏名</FieldLabel>
          <input className="grow font-semibold text-2xl outline-0" placeholder="京産 花子" {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

const StudentEditorStudentNumberField = () => {
  const {
    state: { form },
  } = useStudentEditor();

  return (
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
  );
};

const StudentEditorFacultyField = () => {
  const {
    state: { form, faculties },
  } = useStudentEditor();

  return (
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
            <Select onValueChange={(val) => field.onChange(Number(val) || undefined)} value={field.value?.toString()}>
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
  );
};

const StudentEditorDepartmentField = () => {
  const {
    state: { form, departments },
  } = useStudentEditor();

  return (
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
            <Select onValueChange={(val) => field.onChange(Number(val) || undefined)} value={field.value?.toString()}>
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
  );
};

const StudentEditorDeleteField = () => {
  const {
    actions: { delete: handleDelete },
  } = useStudentEditor();

  if (!handleDelete) return null;

  return (
    <ListItem>
      <ItemContent>
        <ItemTitle>学生を削除</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button variant="destructive" onClick={handleDelete} type="button">
          <Trash2Icon />
          削除
        </Button>
      </ItemActions>
    </ListItem>
  );
};

const StudentEditorCancel = ({ ...props }: React.ComponentProps<"button">) => {
  const {
    state: { form },
  } = useStudentEditor();
  
  return (
    <Button type="button" disabled={form.formState.isSubmitting} variant="ghost" {...props}>
      キャンセル
    </Button>
  );
};

const StudentEditorSubmit = ({ children, ...props }: React.ComponentProps<"button">) => {
  const {
    state: { form },
  } = useStudentEditor();

  const disabled = form.formState.isSubmitting || !form.formState.isDirty;

  return (
    <Button type="submit" disabled={disabled} {...props}>
      {form.formState.isSubmitting && <Spinner />}
      {children}
    </Button>
  );
};

export const StudentEditor = {
  Provider: StudentEditorProvider,
  Frame: StudentEditorFrame,
  FieldSet: StudentEditorFieldSet,
  Hero: StudentEditorHero,
  Avatar: StudentEditorAvatar,
  Field: {
    Name: StudentEditorNameField,
    StudentNumber: StudentEditorStudentNumberField,
    Faculty: StudentEditorFacultyField,
    Department: StudentEditorDepartmentField,
    Delete: StudentEditorDeleteField,
  },
  Cancel: StudentEditorCancel,
  Submit: StudentEditorSubmit,
} as const;
