import { queryOptions } from "@tanstack/react-query";
import { getPost } from "./get-post";
import { getPostList } from "./get-post-list";

export const postKeys = {
  all: ["postList"] as const,
  list: (params?: URLSearchParams) => {
    return queryOptions({
      queryKey: [...postKeys.all, "list", params?.toString()],
      queryFn: () => getPostList(params),
      retry: 1,
      placeholderData: (prev) => prev,
    });
  },
  detail: (id: number) =>
    queryOptions({
      queryKey: [...postKeys.all, "detail", id],
      queryFn: () => getPost(id),
      retry: 1,
      placeholderData: (prev) => prev,
    }),
};
