import { threadKeys } from "@/entities/thread";
import { useQuery } from "@tanstack/react-query";

export const useThreadList = (categoryId?: number) => {
  const params = categoryId ? { categoryId } : undefined;
  return useQuery(threadKeys.list(params));
};
