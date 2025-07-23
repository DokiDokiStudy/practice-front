import { useQuery } from '@tanstack/react-query';
import { fetchPosts, fetchPost, PostsResponse } from '@/api/Posts';
import type { Post } from '@/types';

// 리스트로 조회
export function usePosts(page = 1, limit = 10) {
  const query = useQuery<PostsResponse, Error, PostsResponse>({
    queryKey: ['posts', page, limit],
    queryFn: () => fetchPosts(page, limit),
    keepPreviousData: true,
  });

  // data가 없을 땐 빈 배열 / 기본 페이지 1
  const posts: Post[] = query.data?.data ?? [];
  const totalPages: number = query.data?.meta.totalPages ?? 1;

  return {
    ...query,
    posts,
    totalPages,
  };
}

// 단건 조회 = 게시글 객체 하나 리턴
export function usePost(id: number | undefined) {
  return useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}