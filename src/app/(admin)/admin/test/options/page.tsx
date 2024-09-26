"use client";

import { useForm } from "@tanstack/react-form";
import TestPageHeading from "../TestPageHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { client } from "@/db/hono";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm({
    defaultValues: {
      id: "",
      quizNum: "",
      passingScore: "",
    },
    onSubmit: async ({ value }) => {
      const res = await client.api.admin.game_mode[":id"].$put({
        param: {
          id: value.id,
        },
        json: {
          quizNum: Number(value.quizNum),
          passingScore: Number(value.passingScore),
        },
      });

      if (!res.ok) {
        toast.error("保存に失敗しました");
        return;
      }
      toast.success("保存しました");
    },
  });

  const isDirty = form.useStore((state) => state.isDirty);

  useEffect(() => {
    const fetchGameMode = async () => {
      const res = await client.api.admin.game_mode.$get();

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      form.setFieldValue("id", data.id);
      form.setFieldValue("quizNum", data.quizNum.toString());
      form.setFieldValue("passingScore", data.passingScore.toString());

      setIsLoading(false);
    };

    fetchGameMode();
  }, []);

  return (
    <>
      <TestPageHeading />
      <form
        className="p-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="quizNum"
          children={({ state, handleChange }) => {
            return (
              <div>
                <Label>出題数</Label>
                <Input
                  type="number"
                  className="rounded-lg border border-gray-300 p-2"
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            );
          }}
        />
        <form.Field
          name="passingScore"
          children={({ state, handleChange }) => {
            return (
              <div>
                <Label>合格点</Label>
                <Input
                  type="number"
                  className="rounded-lg border border-gray-300 p-2"
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            );
          }}
        />
        <div className="flex">
          <Button
            type="submit"
            className="ml-auto mt-4"
            disabled={!isDirty || isLoading}
            size="sm"
          >
            保存
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
