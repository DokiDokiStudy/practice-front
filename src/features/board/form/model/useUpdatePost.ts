import { Post, updatePost } from "@/entities/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
