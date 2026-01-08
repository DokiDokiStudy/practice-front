import { queryOptions } from "@tanstack/react-query";
import { readThreadList } from "./read-thread-list";
import { readThread } from "./read-thread";

export const threadKeys = {
  all: ["threadList"] as const,
  list: (params?: { categoryId: number }) =>
    queryOptions({
      queryKey: [...threadKeys.all, "list", params ?? {}],
      queryFn: () => readThreadList(params),
      retry: 1,
      placeholderData: (prev) => prev,
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: [...threadKeys.all, "detail", id],
      queryFn: () => readThread(id),
      retry: 1,
      placeholderData: (prev) => prev,
    }),
};
