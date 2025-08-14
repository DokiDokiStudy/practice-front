import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../api/posts.api";
import { boardUtils } from "../lib/utils";
import type { UpdatePostRequest } from "../api/types";

export function useBoardUpdate(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePostRequest) => {
      const validation = boardUtils.validatePost(data.title, data.content);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(" "));
      }

      return postsApi.updatePost(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "list"] });
      queryClient.invalidateQueries({ queryKey: ["board", "detail", id] });
    },
  });
}

export function useBoardDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postsApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "list"] });
    },
  });
}
