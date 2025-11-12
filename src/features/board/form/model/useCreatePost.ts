import { createPost, Post } from "@/entities/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation<
    Post,
    Error,
    { categoryId: number; title: string; content: string }
  >({
    mutationFn: (payload) => createPost(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
