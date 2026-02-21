"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import {
  ArrowLeftIcon,
  CopyIcon,
  EllipsisIcon,
  EyeIcon,
  PlusCircleIcon,
  ShareIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNavigationGuard } from "next-navigation-guard";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { QuizPlay } from "@/components/quiz-play/quiz-play";
import { QuizSessionHeader, QuizSessionMain } from "@/components/quiz-play/quiz-session";
import { Badge } from "@/components/ui/badge";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlayfulProgress } from "@/components/ui/playful-progress";
import { useQuizTags } from "@/hooks/query/use-quiz-tags";
import { QuizEditorContext, useQuizEditor } from "@/hooks/use-quiz-editor";
import {
  deleteQuiz,
  getQuizTypes,
  makePseudoQuiz,
  type QuizData,
  QuizEditorSchema,
  type QuizEditorValues,
} from "@/lib/quiz";
import { cn, copyToClipboard } from "@/lib/utils";
import { Button } from "../../ui/button";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Spinner } from "../../ui/spinner";
import { Switch } from "../../ui/switch";
import { Textarea } from "../../ui/textarea";
import { QuizEditorSelect } from "./quiz-editor-select";
import { QuizEditorText } from "./quiz-editor-text";
import { QuizEditorTrueFalse } from "./quiz-editor-true-false";

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
  children: React.ReactNode;
  defaultValues?: QuizEditorValues;
  onSubmit: (values: QuizEditorValues) => void;
}) => {
  const form = useForm<QuizEditorValues>({
    resolver: zodResolver(QuizEditorSchema),
    defaultValues,
  });

  return (
    <QuizEditorContext.Provider
      value={{
        form,
        state: form.formState,
        onSubmit,
      }}
    >
      {children}
    </QuizEditorContext.Provider>
  );
};

export const QuizEditorWrapper = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("mx-auto flex max-w-6xl", className)} {...props} />;
};

export const QuizEditorMain = ({ className, ...props }: React.ComponentProps<"form">) => {
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

export const QuizEditorHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("flex items-center gap-2 p-6", className)} {...props} />;
};

export const QuizEditorBack = ({ ...props }: React.ComponentProps<"button">) => {
  return (
    <Button variant="outline" size="icon" asChild {...props}>
      <Link href="/admin/puratto" aria-label="戻る">
        <ArrowLeftIcon />
      </Link>
    </Button>
  );
};

export const QuizEditorTitle = ({ className, ...props }: React.ComponentProps<"h1">) => {
  return <h1 className={cn("flex gap-2 px-2 font-semibold", className)} {...props} />;
};

export const QuizEditorMenu = () => {
  const { form } = useQuizEditor();
  const router = useRouter();

  const quizId = form.getValues("id");

  if (!quizId) return null;

  const handleShare = async () => {
    if ("share" in navigator) {
      await navigator
        .share({
          title: `ぷらっとテスト No.${quizId}`,
          url: window.location.href,
        })
        .catch(() => {});
    }
  };

  const handleCopyUrl = async () => {
    if (await copyToClipboard(window.location.href)) {
      toast.success("リンクをコピーしました");
    } else {
      toast.error("リンクのコピーに失敗しました");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("この問題を削除してよろしいですか？")) return;
    try {
      await deleteQuiz(quizId);
      toast.success("問題を削除しました");
      router.push("/admin/puratto");
    } catch {
      toast.error("問題の削除に失敗しました");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="問題メニュー">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyUrl}>
          <CopyIcon />
          リンクをコピー
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShare}>
          <ShareIcon />
          共有
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} variant="destructive">
          <Trash2Icon />
          削除
        </DropdownMenuItem>
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
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="tags"
        control={form.control}
        render={({ field, fieldState }) => (
          <TagField
            value={field.value ?? []}
            onChange={field.onChange}
            invalid={fieldState.invalid}
            error={fieldState.error}
          />
        )}
      />
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

const TagField = ({
  value,
  onChange,
  invalid,
  error,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  invalid: boolean;
  error?: { message?: string };
}) => {
  const { data: allTags = [] } = useQuizTags();
  const [inputValue, setInputValue] = useState("");

  const anchor = useComboboxAnchor();

  const trimmed = inputValue.trim();
  const lowered = trimmed.toLocaleLowerCase();
  const selectedSet = new Set(value);

  const suggestions = allTags
    .filter((t) => !selectedSet.has(t))
    .filter((t) => !lowered || t.toLocaleLowerCase().includes(lowered));

  const exactExists = allTags.some((t) => t.toLocaleLowerCase() === lowered) || selectedSet.has(trimmed);
  const showCreate = trimmed !== "" && !exactExists;

  const handleValueChange = (selected: string[]) => {
    onChange(selected);
  };

  return (
    <Field data-invalid={invalid}>
      <FieldLabel>管理用タグ</FieldLabel>
      <Combobox
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        value={value}
        onValueChange={handleValueChange}
        multiple
        autoHighlight
      >
        <ComboboxChips ref={anchor} className="w-full bg-background">
          <ComboboxValue>
            {(values) => (
              <React.Fragment>
                {values.map((value: string) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
                <ComboboxChipsInput />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxList className="p-1!">
            {suggestions.map((tag) => (
              <ComboboxItem key={tag} value={tag}>
                {tag}
              </ComboboxItem>
            ))}
            {showCreate && (
              <ComboboxItem value={trimmed}>
                <PlusCircleIcon className="text-muted-foreground" />
                {trimmed}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>管理用タグを追加すると一覧ページでタグごとに絞り込みが可能になります。</FieldDescription>
      {invalid && <FieldError errors={[error]} />}
    </Field>
  );
};

export const QuizEditorFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "sticky bottom-2 ml-auto flex w-fit gap-2 rounded-3xl bg-inherit p-2 px-4 backdrop-blur-md",
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

export const QuizEditorSubmit = ({ children, ...props }: React.ComponentProps<typeof Button>) => {
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

const PreviewQuizPlay = ({ quiz }: { quiz: QuizData }) => {
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
