import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, updatePost, deletePost } from '@/api/Posts';
import type { Post } from '@/types';

export function useCreatePost() {
  const qc = useQueryClient()

  return useMutation<Post, Error, {
    categoryId: number
    title: string
    content: string
  }>({
    mutationFn: (payload) => createPost(payload),
    // onSuccess 콜백에서 캐시 무효화 역할이라고 함
    onSuccess: () => {
      qc.invalidateQueries(['posts'])
    },
  })
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation<
    Post, 
    Error, 
    { id: number; payload: { title: string; content: string } }
  >({
    mutationFn: ({ id, payload }) => updatePost(id, payload),
    onSuccess: (_data, variables) => {
      // 목록 리패치
      qc.invalidateQueries(['posts']);
      // 상세페이지 리패치
      qc.invalidateQueries(['post', variables.id]);
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  // 지우는거라서 첫 번째 인자에 void로 명시해주기
  return useMutation<void, Error, number>({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      qc.invalidateQueries(['posts']);
    },
  });
}