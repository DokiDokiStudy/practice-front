import {
  fetchPosts,
  fetchPost,
  type Post,
  type PostsResponse,
} from "@/entities/post";
import { useQuery } from "@tanstack/react-query";

export function usePosts(page = 1, limit = 10) {
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

export function usePost(id: number | undefined) {
  return useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}
