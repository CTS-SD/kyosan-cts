import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuiz, deleteQuiz, updateQuiz } from "../api";
import { quizKeys } from "../query-keys";
import type { QuizInput } from "../types";

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: QuizInput) => createQuiz(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
    },
  });
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: QuizInput }) => updateQuiz(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
    },
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
    },
  });
};
