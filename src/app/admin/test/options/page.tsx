"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/db/hono";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TestPageHeading from "../TestPageHeading";

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
      <div className="">
        <form
          className="mx-auto max-w-6xl space-y-4 p-6"
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
              className="ml-auto mt-2"
              disabled={!isDirty || isLoading}
              size="sm"
            >
              保存
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
