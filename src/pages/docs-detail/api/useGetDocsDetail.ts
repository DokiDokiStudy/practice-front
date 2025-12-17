import { useQuery } from "@tanstack/react-query";
import { postKeys } from "@/entities/post";

export function useGetDocsDetail(chapterId: string) {
  const postId = parseInt(chapterId);

  return useQuery({
    ...postKeys.detail(postId),
    enabled: !isNaN(postId) && postId > 0,
  });
}
