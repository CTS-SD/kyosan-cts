"use client";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/db/hono";
import { type Quiz } from "@/db/schema";
import { PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { deleteQuiz } from "../admin-api";
import IODialog from "./IODialog";
import QuizListItem from "./QuizListItem";
import TestPageHeading from "./TestPageHeading";

const fetchLimit = 30;

const Page = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [fetchOffset, setFetchOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const hasFetched = useRef(false);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => {
      if (filter === "") {
        return true;
      }
      return q.question.includes(filter);
    });
  }, [quizzes, filter]);

  const fetchQuizzes = useCallback(async (offset: number) => {
    const res = await client.api.admin.quiz.$get({
      query: {
        limit: fetchLimit.toString(),
        offset: offset.toString(),
      },
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();

    setIsLoading(false);
    setQuizzes((prev) => [...prev, ...data]);

    if (data.length === 0 || data.length < fetchLimit) {
      setHasMore(false);
      return;
    }

    setFetchOffset((prev) => prev + fetchLimit);
  }, []);

  useEffect(() => {
    if (!hasFetched.current && hasMore) {
      fetchQuizzes(fetchOffset);
      hasFetched.current = true;
    }
  }, [fetchQuizzes]);

  return (
    <>
      <TestPageHeading />
      <div className="bg-neutral-50">
        <div className="mx-auto min-h-[calc(100dvh_-_221px)] max-w-6xl p-6">
          <div className="flex gap-3">
            <Input
              className="w-full"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="問題を検索"
            />
            <IODialog />
            <Button className="shrink-0 gap-2 rounded-md pl-3" asChild>
              <Link href="/admin/test/q/new">
                <PlusIcon size={20} />
                新規作成
              </Link>
            </Button>
          </div>
          <div className="mt-6">
            <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <>
                  {Array.from({ length: 18 }, (_, i) => (
                    <Skeleton key={i} className="h-[102px] w-full rounded-lg" />
                  ))}
                </>
              ) : (
                <>
                  {filteredQuizzes.map((quiz) => (
                    <ContextMenu key={quiz.id}>
                      <ContextMenuTrigger className="min-w-0">
                        <QuizListItem quiz={quiz} />
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem
                          icon={<TrashIcon size={14} />}
                          onClick={async () =>
                            deleteQuiz(quiz.id, () => {
                              setQuizzes(
                                quizzes.filter((q) => q.id !== quiz.id),
                              );
                            })
                          }
                        >
                          削除
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                </>
              )}
            </ul>
            {hasMore && !isLoading && (
              <div className="mt-4">
                <Button
                  className="w-full"
                  onClick={() => {
                    fetchQuizzes(fetchOffset);
                  }}
                  size="sm"
                  variant="outline"
                >
                  さらに表示
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
