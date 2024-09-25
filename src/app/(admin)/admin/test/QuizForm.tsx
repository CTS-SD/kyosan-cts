import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { client } from "@/db/hono";
import {
  type Quiz,
  type QuizType,
  QuizTypeEnum,
  quizTypeEnum,
} from "@/db/schema";
import { getQuizTypeText } from "@/utils/utils";
import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  quiz?: Quiz;
  isEdit?: boolean;
  setQuizzes: Dispatch<SetStateAction<Quiz[]>>;
};

const QuizForm = ({ quiz, isEdit, setQuizzes }: Props) => {
  const form = useForm({
    defaultValues: {
      question: quiz?.question ?? "",
      type: (quiz?.type ?? "") as QuizTypeEnum,
      answer: quiz?.answer ?? "",
      fakes: quiz?.fakes ?? undefined,
    },
    onSubmit: async ({ value }) => {
      if (isEdit) {
        // update quiz
        const res = await client.api.quiz[":id"].$put({
          param: {
            id: quiz?.id.toString() ?? "",
          },
          json: {
            ...value,
          },
        });

        if (!res.ok) {
          console.error("error");
          return;
        }

        const updatedQuiz = await res.json();

        setQuizzes((prev) =>
          prev.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q))
        );
      } else {
        // create quiz
        const res = await client.api.quiz.$post({
          json: {
            ...value,
          },
        });

        if (!res.ok) {
          console.error("error");
          return;
        }

        const newQuiz = await res.json();

        setQuizzes((prev) => [...prev, newQuiz]);
      }
    },
  });

  const values = { type: form.useStore((s) => s.values.type) };
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="type"
        children={({ state, handleChange, handleBlur }) => {
          return (
            <div>
              <Label>形式</Label>
              <Select
                onValueChange={(val) => handleChange(val as QuizTypeEnum)}
                defaultValue={state.value}
                value={state.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="形式を選択" />
                </SelectTrigger>
                <SelectContent>
                  {quizTypeEnum.enumValues.map((t, i) => {
                    return (
                      <SelectItem key={i} value={t}>
                        {getQuizTypeText(t)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          );
        }}
      />
      <form.Field
        name="question"
        children={({ state, handleChange, handleBlur }) => {
          return (
            <div>
              <Label>問題文</Label>
              <Textarea
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
              />
            </div>
          );
        }}
      />
      {values.type === "ox" ? (
        <form.Field
          name="answer"
          children={({ state, handleChange }) => {
            return (
              <div>
                <Label>答え</Label>
                <Select
                  onValueChange={(val) => handleChange(val as QuizType)}
                  defaultValue={state.value}
                  value={state.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="答えを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__true__">○</SelectItem>
                    <SelectItem value="__false__">✗</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        />
      ) : (
        <form.Field
          name="answer"
          children={({ state, handleChange, handleBlur }) => {
            return (
              <div>
                <Label>答え</Label>
                <Input
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                />
              </div>
            );
          }}
        />
      )}
      {values.type === "select" && (
        <form.Field
          name="fakes"
          children={({ state, handleChange, handleBlur }) => {
            return (
              <div>
                <Label>不正解の選択肢</Label>
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
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="rounded-md shrink-0"
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
              </div>
            );
          }}
        />
      )}
      <Button type="submit" className="mt-4">
        {isEdit ? "保存" : "作成"}
      </Button>
    </form>
  );
};

export default QuizForm;
