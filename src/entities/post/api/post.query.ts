import { queryOptions } from "@tanstack/react-query";
import { readPost } from "./read-post";
import { readPostList, readPostListFilterWithCategory } from "./read-post-list";
import { PostListGetResponse } from "../model";

export const postKeys = {
  all: ["postList"] as const,
  list: (params?: URLSearchParams) => {
    return queryOptions({
      queryKey: [...postKeys.all, "list", params?.toString()],
      queryFn: async () => {
        const page = params!.get("page")!;
        return await readPostList(Number(page));
      },
      retry: 1,
      placeholderData: (prev) => prev,
    });
  },
  listFilterWithCategory: (params: URLSearchParams) => {
    return queryOptions({
      queryKey: [...postKeys.all, "listFilterWithCategory", params?.toString()],
      queryFn: async () => {
        const categoryId = params.get("categoryId")!;
        return await readPostListFilterWithCategory(Number(categoryId));
      },
      retry: 1,
      placeholderData: (prev) => prev,
    });
  },
  detail: (id: number) =>
    queryOptions({
      queryKey: [...postKeys.all, "detail", id],
      queryFn: () => readPost(id),
      retry: 1,
      placeholderData: (prev) => prev,
    }),
};
