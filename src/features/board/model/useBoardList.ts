import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../api/posts.api";
import { boardUtils } from "../lib/utils";
import type { Post } from "../api/types";
import type { BoardPost } from "./types";

export function useBoardList(page = 1, limit = 10) {
  const query = useQuery({
    queryKey: ["board", "list", page, limit],
    queryFn: () => postsApi.getPosts(page, limit),
    placeholderData: (previousData) => previousData,
    retry: 1,
  });

  const posts: BoardPost[] = query.data?.data ?? [];
  const totalPages: number = query.data?.meta?.totalPages ?? 1;
  const total: number = query.data?.meta?.total ?? 0;

  return {
    ...query,
    posts,
    totalPages,
    total,
    utils: boardUtils,
  };
}
