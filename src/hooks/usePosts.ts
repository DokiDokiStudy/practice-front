import { fetchPost, fetchPosts, Post, PostsResponse } from "@/entities/post";
import { useQuery } from "@tanstack/react-query";

// 리스트로 조회
export function usePosts(page = 1, limit = 10) {
  const query = useQuery<PostsResponse, Error, PostsResponse>({
    queryKey: ["posts", page, limit],
    queryFn: () => fetchPosts(page, limit),
    placeholderData: (previousData) => previousData, // keepPreviousData 대신 사용하면 좋다길래 넣어봄요
    retry: 1, // 1번만 재시도
  });

  // data가 없을 땐 빈 배열 / 기본 페이지 1 - 더 안전하게 처리
  const posts: Post[] = query.data?.data ?? [];
  const totalPages: number = query.data?.meta?.totalPages ?? 1;
  const total: number = query.data?.meta?.total ?? 0;

  return {
    ...query,
    posts,
    totalPages,
    total,
  };
}

// 단건 조회 = 게시글 객체 하나 리턴
export function usePost(id: number | undefined) {
  return useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}
