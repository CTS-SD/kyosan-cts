"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, use } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { departmentGradientStyle } from "@/features/departments/assets";
import { DepartmentEditorSchema, type DepartmentValues } from "@/features/departments/editor";

const DepartmentEditorContext = createContext<{
  form: ReturnType<typeof useForm<DepartmentValues>>;
} | null>(null);

const useDepartmentEditor = () => {
  const context = use(DepartmentEditorContext);
  if (!context) throw new Error("useDepartmentEditor must be used within a DepartmentEditor");
  return context;
};

export const DepartmentEditor = ({
  defaultValues,
  onSubmit,
  children,
}: {
  defaultValues?: Partial<DepartmentValues>;
  onSubmit?: (values: DepartmentValues) => Promise<boolean>;
  children: React.ReactNode;
}) => {
  const form = useForm<DepartmentValues>({
    resolver: zodResolver(DepartmentEditorSchema),
    defaultValues: {
      name: "",
      color: "#3b82f6",
      ...defaultValues,
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    const shouldClean = onSubmit ? await onSubmit(values) : false;
    if (shouldClean) {
      form.reset({ name: "", color: "#3b82f6" });
    } else {
      form.reset(values);
    }
  });

  return (
    <DepartmentEditorContext.Provider value={{ form }}>
      <form onSubmit={handleSubmit} className="contents">
        {children}
      </form>
    </DepartmentEditorContext.Provider>
  );
};

export const DepartmentEditorFields = () => {
  const { form } = useDepartmentEditor();
  const [name, color] = form.watch(["name", "color"]);

  return (
    <FieldSet disabled={form.formState.isSubmitting} className="px-6 pt-6 pb-2">
      <div
        className="flex items-center justify-center rounded-2xl px-4 py-5 text-white shadow-inner"
        style={departmentGradientStyle(color)}
      >
        <span className="font-bold text-2xl">{name || "部署名"}</span>
      </div>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>部署名</FieldLabel>
            <Input {...field} placeholder="総務部署" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="color"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>色</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="outline" className="justify-start gap-2 font-normal">
                  <span className="size-5 rounded-full border" style={{ backgroundColor: field.value }} />
                  <span className="uppercase">{field.value}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto items-center gap-3">
                <HexColorPicker color={field.value} onChange={field.onChange} />
                <div className="flex items-center gap-1 self-stretch">
                  <span className="text-muted-foreground">#</span>
                  <HexColorInput
                    color={field.value}
                    onChange={field.onChange}
                    className="h-9 w-full rounded-md border bg-transparent px-3 text-sm uppercase outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </PopoverContent>
            </Popover>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldSet>
  );
};

export const DepartmentEditorCancel = ({ ...props }: React.ComponentProps<"button">) => {
  const { form } = useDepartmentEditor();

  return (
    <Button type="button" disabled={form.formState.isSubmitting} variant="ghost" {...props}>
      キャンセル
    </Button>
  );
};

export const DepartmentEditorSubmit = ({ children, ...props }: React.ComponentProps<"button">) => {
  const { form } = useDepartmentEditor();

  const disabled = form.formState.isSubmitting || !form.formState.isDirty;

  return (
    <Button type="submit" disabled={disabled} {...props}>
      {form.formState.isSubmitting && <Spinner />}
      {children}
    </Button>
  );
};
