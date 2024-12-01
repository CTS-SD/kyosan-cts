"use client";

import {
  MultiSwitch,
  MultiSwitchItem,
} from "@/components/original-ui/multi-switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { client } from "@/db/hono";
import { type Quiz, QuizTypeEnum } from "@/db/schema";
import { cn } from "@/utils/utils";
import { useForm } from "@tanstack/react-form";
import {
  EyeOffIcon,
  LightbulbIcon,
  LockIcon,
  LockOpenIcon,
  PanelsTopLeftIcon,
  TextIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { toast } from "sonner";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import FieldError from "@/components/original-ui/field-error";
import Preview from "./Preview";
import { deleteQuiz } from "../admin-api";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

type Props = {
  quiz?: Quiz;
  isEdit?: boolean;
  onSaved?: (quiz: Quiz) => void;
  onDeleted?: (quizId: string) => void;
} & React.HTMLAttributes<HTMLFormElement>;

const QuizForm = ({
  quiz,
  isEdit,
  onSaved,
  onDeleted,
  className,
  ...props
}: Props) => {
  const router = useRouter();
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      question: quiz?.question ?? "",
      type: (quiz?.type ?? "select") as QuizTypeEnum,
      answer: quiz?.answer ?? "",
      explanation: quiz?.explanation ?? undefined,
      fakes: quiz?.fakes ?? undefined,
      isPublic: quiz?.isPublic ?? true,
    },
    onSubmit: async ({ value }) => {
      if (isEdit) {
        // update quiz
        const res = await client.api.admin.quiz[":id"].$put({
          param: {
            id: quiz?.id.toString() ?? "",
          },
          json: {
            ...value,
          },
        });

        if (!res.ok) {
          toast.error("問題の保存に失敗しました");
          return;
        }

        const updatedQuiz = await res.json();
        onSaved?.(updatedQuiz);

        toast.success("問題を保存しました");
      } else {
        // create quiz
        const res = await client.api.admin.quiz.$post({
          json: {
            ...value,
          },
        });

        if (!res.ok) {
          toast.error("問題の作成に失敗しました");
          return;
        }

        const newQuiz = await res.json();
        onSaved?.(newQuiz);

        toast.success("問題を作成しました");
        router.replace(`/admin/test/q/${newQuiz.id}`);
      }
    },
  });

  const values = {
    type: form.useStore((s) => s.values.type),
    question: form.useStore((s) => s.values.question),
    answer: form.useStore((s) => s.values.answer),
    explanation: form.useStore((s) => s.values.explanation),
    fakes: form.useStore((s) => s.values.fakes),
    isPublic: form.useStore((s) => s.values.isPublic),
  };
  const isDirty = form.useStore((s) => s.isDirty);
  const isSubmitting = form.useStore((s) => s.isSubmitting);

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <form
        {...props}
        className={cn(
          "flex flex-1 flex-col gap-6 border-b border-dashed pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-6",
          className,
        )}
        onSubmit={(e) => {
          e.preventDefault();
          if (values.type !== "select") {
            form.setFieldMeta("fakes", (meta) => ({
              ...meta,
              errorMap: {},
              errors: [],
            }));
          }
          form.handleSubmit();
        }}
      >
        <form.Field
          name="type"
          children={({ state, handleChange }) => {
            return (
              <div>
                <Label icon={<PanelsTopLeftIcon size="16" />}>形式</Label>
                <MultiSwitch
                  value={state.value}
                  onValueChange={(value) => {
                    handleChange(value as QuizTypeEnum);
                  }}
                >
                  <MultiSwitchItem value="select">選択</MultiSwitchItem>
                  <MultiSwitchItem value="input">テキスト</MultiSwitchItem>
                  <MultiSwitchItem value="ox">○✕クイズ</MultiSwitchItem>
                </MultiSwitch>
              </div>
            );
          }}
        />
        <form.Field
          name="question"
          validators={{
            onSubmit: z.string().min(1, "問題文を入力してください"),
          }}
          children={({ state, handleChange, handleBlur }) => {
            return (
              <div>
                <Label icon={<TextIcon size="16" />}>問題文</Label>
                <Textarea
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="問題文を入力"
                  className="min-h-28 md:min-h-40"
                />
                <FieldError errors={state.meta.errors} />
              </div>
            );
          }}
        />
        {values.type === "ox" ? (
          <form.Field
            name="answer"
            validators={{
              onSubmit: z.string().regex(/^__(true|false)__$/, {
                message: "答えを選択してください",
              }),
            }}
            children={({ state, handleChange }) => {
              return (
                <div>
                  <Label icon={<ThumbsUpIcon size="16" />}>答え</Label>
                  <MultiSwitch value={state.value} onValueChange={handleChange}>
                    <MultiSwitchItem value="__true__">○</MultiSwitchItem>
                    <MultiSwitchItem value="__false__">✕</MultiSwitchItem>
                  </MultiSwitch>
                  <FieldError errors={state.meta.errors} />
                </div>
              );
            }}
          />
        ) : (
          <form.Field
            name="answer"
            validators={{
              onSubmit: z.string().min(1, "答えを入力してください"),
            }}
            children={({ state, handleChange, handleBlur }) => {
              return (
                <div>
                  <Label icon={<ThumbsUpIcon size="16" />}>答え</Label>
                  <Input
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    placeholder="答えを入力"
                  />
                  <FieldError errors={state.meta.errors} />
                </div>
              );
            }}
          />
        )}
        {values.type === "select" && (
          <form.Field
            name="fakes"
            validators={{
              onSubmit: z
                .array(z.string().min(1, "選択肢を入力してください"))
                .min(1, "選択肢を1つ以上追加してください"),
            }}
            children={({ state, handleChange, handleBlur }) => {
              return (
                <div>
                  <Label icon={<ThumbsDownIcon size="16" />}>
                    不正解の選択肢
                  </Label>
                  <div className="flex flex-col gap-2">
                    {state.value?.map((fake, i) => (
                      <div key={i} className="flex gap-2">
                        <Input
                          value={fake}
                          onChange={(e) => {
                            const newValue = [...(state.value ?? [])];
                            newValue[i] = e.target.value;
                            handleChange(newValue);
                          }}
                          onBlur={handleBlur}
                          placeholder="選択肢を入力"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="shrink-0 rounded-md"
                          onClick={() => {
                            const newValue = [...(state.value ?? [])];
                            newValue.splice(i, 1);
                            handleChange(newValue);
                          }}
                        >
                          <XIcon size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleChange([...(state.value ?? []), ""]);
                      }}
                    >
                      + 選択肢を追加
                    </Button>
                  </div>
                  <FieldError errors={state.meta.errors} />
                </div>
              );
            }}
          />
        )}
        <form.Field
          name="explanation"
          validators={{}}
          children={({ state, handleChange, handleBlur }) => {
            return (
              <div>
                <Label icon={<LightbulbIcon size="16" />}>解説</Label>
                <Textarea
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="解説を入力（任意）"
                />
                <FieldError errors={state.meta.errors} />
              </div>
            );
          }}
        />
        <form.Field
          name="isPublic"
          validators={{
            onSubmit: z.boolean(),
          }}
          children={({ state, handleChange, handleBlur }) => {
            return (
              <div>
                <Label
                  icon={
                    values.isPublic ? (
                      <LockOpenIcon size="16" />
                    ) : (
                      <LockIcon size="16" />
                    )
                  }
                >
                  公開設定
                </Label>
                <label className="relative flex cursor-pointer items-center justify-between gap-2 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div
                      className={cn(
                        "font-semibold transition-all",
                        values.isPublic ? "" : "blur-md",
                      )}
                    >
                      この問題を公開する
                    </div>
                    <div
                      className={cn(
                        "text-sm text-neutral-500 transition-all",
                        values.isPublic ? "" : "blur-md",
                      )}
                    >
                      非公開にした問題はユーザーに出題されません
                    </div>
                  </div>
                  <Switch
                    checked={state.value}
                    onCheckedChange={(checked) => handleChange(checked)}
                    onBlur={handleBlur}
                  />
                  {!values.isPublic && (
                    <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-neutral-500">
                      <EyeOffIcon size={16} />
                      非公開
                    </div>
                  )}
                </label>
              </div>
            );
          }}
        />
        <div className="flex items-center gap-2">
          {isEdit && (
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="shrink-0 rounded-md"
              onClick={() =>
                deleteQuiz(quiz?.id, (q) => {
                  onDeleted?.(q);
                  router.replace("/admin/test");
                })
              }
            >
              <TrashIcon size={16} />
            </Button>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={!isDirty}
            loading={isSubmitting}
          >
            {isEdit ? "保存" : "作成"}
          </Button>
        </div>
      </form>
      <div className="mx-auto w-full max-w-lg flex-1">
        <Preview
          quiz={{
            ...quiz!,
            type: values.type,
            question: values.question,
            answer: values.answer,
            explanation: values.explanation ?? null,
            fakes: values.fakes ?? null,
          }}
        />
      </div>
    </div>
  );
};

export default QuizForm;
