"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { client } from "@/db/hono";
import { type Quiz } from "@/db/schema";
import { PencilIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QuizForm from "./QuizForm";
import QuizListItem from "./QuizListItem";
import TestPageHeading from "./TestPageHeading";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { deleteQuiz } from "../admin-api";

const fetchLimit = 30;

const Page = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<Quiz>();
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
        <div className="max-w-5xl mx-auto min-h-[calc(100dvh_-_221px)] p-6">
          <div className="flex gap-3">
            <Input
              className="w-full"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="問題を検索"
            />
            <Dialog
              onOpenChange={(open) => setIsCreateDialogOpen(open)}
              open={isCreateDialogOpen}
            >
              <DialogTrigger className="" asChild>
                <Button className="rounded-md shrink-0" size="icon">
                  <PlusIcon size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="p-0 max-h-[95dvh] mt-[5dvh] rounded-t-2xl max-w-[1024px] mx-auto md:max-h-[90dvh] md:mt-0"
              >
                <DialogHeader className="sticky flex-row px-6 top-0 bg-white/50 backdrop-blur-sm flex items-center py-3 pr-3 justify-between">
                  <DialogTitle>問題を編集</DialogTitle>
                  <DialogClose asChild>
                    <Button className="!mt-0" size="icon" variant="ghost">
                      <XIcon />
                    </Button>
                  </DialogClose>
                </DialogHeader>
                <div className="grow pr-6 pb-6 pl-6">
                  <QuizForm
                    onSaved={(quiz) => {
                      setQuizzes([quiz, ...quizzes]);
                      setIsCreateDialogOpen(false);
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-6">
            <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <>
                  {Array.from({ length: 18 }, (_, i) => (
                    <Skeleton key={i} className="w-full h-[102px] rounded-lg" />
                  ))}
                </>
              ) : (
                <>
                  {filteredQuizzes.map((quiz) => (
                    <ContextMenu key={quiz.id}>
                      <ContextMenuTrigger className="min-w-0">
                        <QuizListItem
                          quiz={quiz}
                          onClick={() => {
                            setActiveQuiz(quiz);
                            setIsEditDialogOpen(true);
                          }}
                        />
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem
                          onClick={() => {
                            setActiveQuiz(quiz);
                            setIsEditDialogOpen(true);
                          }}
                          icon={<PencilIcon size={14} />}
                        >
                          編集
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem
                          icon={<TrashIcon size={14} />}
                          onClick={async () =>
                            deleteQuiz(quiz.id, () => {
                              setQuizzes(
                                quizzes.filter((q) => q.id !== quiz.id)
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
      <Dialog
        onOpenChange={(open) => setIsEditDialogOpen(open)}
        open={isEditDialogOpen}
      >
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="p-0 max-h-[95dvh] mt-[2.5dvh] rounded-t-2xl max-w-[1024px] mx-auto md:max-h-[90dvh] md:mt-0"
        >
          <DialogHeader className="sticky flex-row px-6 top-0 bg-white/50 backdrop-blur-sm flex items-center py-3 pr-3 justify-between">
            <DialogTitle>問題を編集</DialogTitle>
            <DialogClose asChild>
              <Button className="!mt-0" size="icon" variant="ghost">
                <XIcon />
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="grow pr-6 pb-6 pl-6">
            <QuizForm
              quiz={activeQuiz}
              isEdit
              onDeleted={(deletedQuizId) => {
                setIsEditDialogOpen(false);
                setQuizzes(quizzes.filter((q) => q.id !== deletedQuizId));
              }}
              onSaved={(quiz) => {
                setQuizzes(quizzes.map((q) => (q.id === quiz.id ? quiz : q)));
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Page;
