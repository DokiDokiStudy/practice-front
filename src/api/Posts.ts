import api from '@/lib/api';
import type { Post } from '@/types';

// 백엔드로 치면 레파지토리와 역할이 같다.

// 백엔드 응답은 이렇게 올거야~ 라는 기대로 사용할 수 있겠다.
export interface PostsResponse {
  data: Post[];
  meta: {
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}

export const fetchPosts = (
  page = 1,
  limit = 10
): Promise<PostsResponse> => 
  api
    .get<PostsResponse>(`/post?page=${page}&limit=${limit}`)
    .then(res => res.data);

export const fetchPost = (id: number): Promise<Post> =>
  api.get(`/post/${id}`).then(res => res.data.data);

export const createPost = (payload: {
  categoryId: number;
  title: string;
  content: string;
}): Promise<Post> =>
  api
    .post<{ data: Post }>('/post', payload)
    .then(res => res.data.data);

export const updatePost = (
  id: number,
  payload: { title: string; content: string }
): Promise<Post> =>
  api.patch<{ data: Post }>(`/post/${id}`, payload).then(res => res.data.data);

export const deletePost = (id: number): Promise<void> =>
  api.delete<void>(`/post/${id}`).then(() => {});

// 카테고리 레파지토리
export interface Category {
  id: number;
  name: string;
}

export const fetchCategories = (): Promise<Category[]> =>
  api
    .get<{ data: Category[] }>('/category')
    .then(res => res.data.data);
