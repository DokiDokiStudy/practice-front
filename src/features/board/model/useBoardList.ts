import { useQuery } from "@tanstack/react-query";
import { fetchPosts, type PostsResponse } from "@/entities/post";

export function useBoardList(page = 1, limit = 10) {
  const query = useQuery<PostsResponse>({
    queryKey: ["posts", page, limit],
    queryFn: () => fetchPosts(page, limit),
    retry: 1,
    placeholderData: (prev) => prev,
  });

  return {
    ...query,
    posts: query.data?.data ?? [],
    totalPages: query.data?.meta?.totalPages ?? 1,
    total: query.data?.meta?.total ?? 0,
  };
}
