import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../api/posts.api";
import { boardUtils } from "../lib/utils";
import type { Post } from "../api/types";
import type { BoardPost } from "./types";

export function useBoardDetail(id: number | undefined) {
  const query = useQuery<BoardPost>({
    queryKey: ["board", "detail", id],
    queryFn: () => postsApi.getPost(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    utils: boardUtils,
  };
}
