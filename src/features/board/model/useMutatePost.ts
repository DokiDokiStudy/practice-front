import { createPost, updatePost, deletePost, type Post } from "@/entities/post";
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

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation<
    Post,
    Error,
    { id: number; payload: { title: string; content: string } }
  >({
    mutationFn: ({ id, payload }) => updatePost(id, payload),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      qc.invalidateQueries({ queryKey: ["post", variables.id] });
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
