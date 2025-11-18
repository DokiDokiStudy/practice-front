import { deletePost } from "@/entities/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
