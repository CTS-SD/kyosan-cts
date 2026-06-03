"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, use } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldError, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { List, ListItem } from "@/components/ui/list";
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
      <form onSubmit={handleSubmit} className="">
        {children}
      </form>
    </DepartmentEditorContext.Provider>
  );
};

export const DepartmentEditorFields = () => {
  const { form } = useDepartmentEditor();
  const [name, color] = form.watch(["name", "color"]);

  return (
    <div className="p-6">
      <div
        className="flex items-center justify-center rounded-xl border-4 border-border/40 px-4 py-5 text-white"
        style={departmentGradientStyle(color)}
      >
        <span className="font-bold text-lg">{name || "部署名"}</span>
      </div>
      <FieldSet disabled={form.formState.isSubmitting} className="pt-4">
        <List>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <ListItem>
                <ItemContent>
                  <ItemTitle>部署名</ItemTitle>
                  <ItemDescription>部署名を入力してください。</ItemDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </ItemContent>
                <ItemActions>
                  <Input {...field} placeholder="総務部署" />
                </ItemActions>
              </ListItem>
            )}
          />
          <Controller
            name="color"
            control={form.control}
            render={({ field, fieldState }) => (
              <ListItem>
                <ItemContent>
                  <ItemTitle>テーマ色</ItemTitle>
                  <ItemDescription>部署のテーマカラーを設定します。</ItemDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </ItemContent>
                <ItemActions>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" className="min-w-32 justify-start gap-2 font-normal">
                        <span className="size-5 rounded-full border" style={{ backgroundColor: field.value }} />
                        <span className="uppercase">{field.value}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-auto items-center gap-3 p-1">
                      <HexColorPicker className="pt-1" color={field.value} onChange={field.onChange} />
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
                </ItemActions>
              </ListItem>
            )}
          />
        </List>
      </FieldSet>
    </div>
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
