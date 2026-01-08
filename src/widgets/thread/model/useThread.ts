import { threadKeys } from "@/entities/thread";
import { useQuery } from "@tanstack/react-query";

export const useThread = (threadId: number) => {
  return useQuery(threadKeys.detail(threadId));
};
