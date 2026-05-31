"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import { ArrowLeftIcon, EllipsisIcon, EyeIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useNavigationGuard } from "next-navigation-guard";
import { type ComponentProps, createContext, type ReactNode, useContext, useMemo, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PlayfulProgress } from "@/components/ui/playful-progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getQuizTypes, makePseudoQuiz, type Quiz, QuizEditorSchema, type QuizEditorValues } from "@/features/quizzes";
import { QuizMenuItems } from "@/features/quizzes/components/quiz-menu";
import { QuizPlay } from "@/features/quizzes/components/quiz-play";
import { QuizSessionHeader, QuizSessionMain } from "@/features/quizzes/components/quiz-session";
import { cn } from "@/lib/utils";
import { QuizEditorSelect } from "./quiz-editor-select";
import { QuizEditorTags } from "./quiz-editor-tags";
import { QuizEditorText } from "./quiz-editor-text";
import { QuizEditorTrueFalse } from "./quiz-editor-true-false";

type QuizEditorState = {
  form: UseFormReturn<QuizEditorValues>;
  state: UseFormReturn<QuizEditorValues>["formState"];
  onSubmit: (values: QuizEditorValues) => void;
};

export const QuizEditorContext = createContext<QuizEditorState | null>(null);

export const useQuizEditor = (): QuizEditorState => {
  const value = useContext(QuizEditorContext);
  if (!value) throw new Error("useQuizEditor must be used within a QuizEditorContext.Provider");
  return value;
};

export const QuizEditorProvider = ({
  children,
  defaultValues = {
    id: null,
    type: "select",
    question: "",
    explanation: "",
    isPublished: true,
    tags: [],
    correctChoicesText: "",
    incorrectChoicesText: "",
  },
  onSubmit,
}: {
  children: ReactNode;
  defaultValues?: QuizEditorValues;
  onSubmit: (values: QuizEditorValues) => void;
}) => {
  const form = useForm<QuizEditorValues>({
    resolver: zodResolver(QuizEditorSchema),
    defaultValues,
  });

  return (
    <QuizEditorContext.Provider value={{ form, state: form.formState, onSubmit }}>
      {children}
    </QuizEditorContext.Provider>
  );
};

export const QuizEditorWrapper = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cn("mx-auto flex max-w-6xl", className)} {...props} />;
};

export const QuizEditorMain = ({ className, ...props }: ComponentProps<"form">) => {
  const { form, state, onSubmit } = useQuizEditor();

  useNavigationGuard({
    enabled: state.isDirty && !state.isSubmitting,
    confirm: () => window.confirm("保存されていない変更があります。ページを離れますか？"),
  });

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(values);
    form.reset(values);
  });

  return <form className={cn("flex-1", className)} onSubmit={handleSubmit} {...props} />;
};

export const QuizEditorHeader = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cn("flex items-center gap-2 p-6", className)} {...props} />;
};

export const QuizEditorBack = ({ ...props }: ComponentProps<"button">) => {
  return (
    <Button variant="outline" size="icon" asChild {...props}>
      <Link href="/admin/puratto" aria-label="戻る">
        <ArrowLeftIcon />
      </Link>
    </Button>
  );
};

export const QuizEditorTitle = ({ className, ...props }: ComponentProps<"h1">) => {
  return <h1 className={cn("flex gap-2 px-2 font-semibold", className)} {...props} />;
};

export const QuizEditorMenu = () => {
  const { form } = useQuizEditor();

  const quizId = form.getValues("id");

  if (!quizId) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="問題メニュー">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <QuizMenuItems quizId={quizId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const QuizEditorFields = () => {
  const { form } = useQuizEditor();
  const quizType = form.watch("type");

  return (
    <FieldGroup className="px-6 pb-12">
      <Controller
        name="type"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>回答形式</FieldLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getQuizTypes().map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="question"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>問題文</FieldLabel>
            <Textarea {...field} placeholder="問題文を入力" data-testid="question-textarea" className="bg-background" />
            <FieldDescription>
              <Link href="/admin/docs/markdown" target="_blank">
                マークダウン記法
              </Link>
              を使用できます。
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {quizType === "select" && <QuizEditorSelect form={form} />}
      {quizType === "text" && <QuizEditorText form={form} />}
      {quizType === "true_false" && <QuizEditorTrueFalse form={form} />}
      <Controller
        name="explanation"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>解説</FieldLabel>
            <Textarea {...field} value={field.value ?? ""} placeholder="解説を入力（任意）" className="bg-background" />
            <FieldDescription>
              <Link href="/admin/docs/markdown" target="_blank">
                マークダウン記法
              </Link>
              を使用できます。
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <QuizEditorTags />
      <Controller
        name="isPublished"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field orientation="horizontal" data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor="publish">問題を公開する</FieldLabel>
              <FieldDescription>非公開にした問題は出題されません</FieldDescription>
            </FieldContent>
            <Switch id="publish" checked={field.value} onCheckedChange={field.onChange} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export const QuizEditorFooter = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "sticky bottom-2 mr-2 ml-auto flex w-fit gap-2 rounded-3xl bg-inherit p-2 backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
};

export const QuizEditorCancel = () => {
  const { state } = useQuizEditor();

  return (
    <Button className="ml-auto" variant="outline" disabled={state.isSubmitting} asChild>
      <Link href="/admin/puratto">キャンセル</Link>
    </Button>
  );
};

export const QuizEditorSubmit = ({ children, ...props }: ComponentProps<typeof Button>) => {
  const { state } = useQuizEditor();

  return (
    <Button type="submit" disabled={state.isSubmitting || !state.isDirty} {...props}>
      {state.isSubmitting && <Spinner />}
      {children}
    </Button>
  );
};

const MobilePreviewContent = () => {
  const quiz = usePreviewQuiz();

  if (!quiz) return null;

  return (
    <QuizSessionMain className="w-full overflow-auto">
      <QuizSessionHeader className="pt-2">
        <Badge variant="outline">プレビュー</Badge>
        <PlayfulProgress value={20} />
        <DialogClose asChild>
          <Button variant="outline">
            <XIcon />
            閉じる
          </Button>
        </DialogClose>
      </QuizSessionHeader>
      <PreviewQuizPlay quiz={quiz} />
    </QuizSessionMain>
  );
};

export const QuizEditorMobilePreviewButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="md:hidden" asChild>
        <Button variant="outline" aria-label="プレビューを表示">
          <EyeIcon />
          プレビュー
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[95dvh] w-full flex-col bg-background" showCloseButton={false}>
        <DialogTitle className="sr-only">プレビュー</DialogTitle>
        {open && <MobilePreviewContent />}
      </DialogContent>
    </Dialog>
  );
};

export const QuizEditorPreview = () => {
  const quiz = usePreviewQuiz();

  if (!quiz) return null;

  return (
    <div className="sticky top-0 hidden h-dvh max-w-lg flex-1 flex-col overflow-y-auto overscroll-contain p-4 md:flex">
      <div className="flex w-full grow flex-col overflow-y-auto rounded-3xl bg-accent p-1.5">
        <QuizSessionMain className="w-full rounded-2xl">
          <QuizSessionHeader>
            <Badge variant="outline">プレビュー</Badge>
            <PlayfulProgress value={20} />
          </QuizSessionHeader>
          <PreviewQuizPlay quiz={quiz} />
        </QuizSessionMain>
      </div>
    </div>
  );
};

const PreviewQuizPlay = ({ quiz }: { quiz: Quiz }) => {
  const [key, setKey] = useState(0);
  return (
    <QuizPlay.Provider key={key} quiz={quiz} onNext={() => setKey((k) => k + 1)} enableKeyboard>
      <QuizPlay.Content />
    </QuizPlay.Provider>
  );
};

const usePreviewQuiz = () => {
  const { form } = useQuizEditor();
  const debouncedValues = useDebounce(form.watch(), 300);
  return useMemo(() => makePseudoQuiz(debouncedValues), [debouncedValues]);
};

export const QuizEditor = {
  Provider: QuizEditorProvider,
  Wrapper: QuizEditorWrapper,
  Main: QuizEditorMain,
  Header: QuizEditorHeader,
  Back: QuizEditorBack,
  Title: QuizEditorTitle,
  Menu: QuizEditorMenu,
  Fields: QuizEditorFields,
  Footer: QuizEditorFooter,
  Cancel: QuizEditorCancel,
  Submit: QuizEditorSubmit,
  MobilePreviewButton: QuizEditorMobilePreviewButton,
  Preview: QuizEditorPreview,
};
