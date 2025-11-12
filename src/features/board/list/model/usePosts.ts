import { useQuery } from "@tanstack/react-query";
import { fetchPosts, PostListGetResponse } from "@/entities/post";

export function usePosts(page = 1, limit = 10) {
  const query = useQuery<PostListGetResponse>({
    queryKey: ["posts", page, limit],
    queryFn: () => fetchPosts(page, limit),
    retry: 1,
    placeholderData: (prev) => prev,
  });

  return {
    ...query,
    posts: query.data?.posts ?? [],
    totalPages: query.data?.meta?.totalPages ?? 1,
    total: query.data?.meta?.total ?? 0,
  };
}
