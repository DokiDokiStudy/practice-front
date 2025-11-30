import { queryOptions } from "@tanstack/react-query";
import { getPost } from "./getPost";
import { getPostList } from "./getPostList";

export const postKeys = {
  all: ["postList"] as const,
  list: (page = 1, limit = 10) =>
    queryOptions({
      queryKey: [...postKeys.all, "list", page, limit],
      queryFn: () => getPostList(page, limit),
      // 이 구조는 entity에서 다루는 것은 좀 과하다고 생각 추후 검토
      // select: (data) => ({
      //   posts: data.posts,
      //   meta: data.meta,
      //   totalPages: data.meta.totalPages ?? 1,
      //   total: data.meta.total ?? 0,
      // }),
      retry: 1,
      placeholderData: (prev) => prev,
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...postKeys.all, "detail", id],
      queryFn: () => getPost(id),
      retry: 1,
      placeholderData: (prev) => prev,
    }),
};
