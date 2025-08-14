import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../api/posts.api";
import { boardUtils } from "../lib/utils";
import type { CreatePostRequest } from "../api/types";

export function useBoardCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => {
      const validation = boardUtils.validatePost(data.title, data.content);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(" "));
      }

      return postsApi.createPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "list"] });
    },
  });
}
