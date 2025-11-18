import { api } from "@/shared/api";
import type { GetResponse } from "@/shared/types/getResponse";
import type { Post, PostListGetResponse } from "@/entities/post/model";

export const fetchPosts = (
  page = 1,
  limit = 10
): Promise<PostListGetResponse> =>
  api
    .get<GetResponse<PostListGetResponse>>(`/posts?page=${page}&limit=${limit}`)
    .then((res) => res.data.data);

export const fetchPost = (id: number): Promise<GetResponse<Post>> =>
  api.get(`/post/${id}`).then((res) => res.data.data);

export const createPost = (payload: {
  categoryId: number;
  title: string;
  content: string;
}): Promise<Post> =>
  api.post<{ data: Post }>("/posts", payload).then((res) => res.data.data);

export const updatePost = (
  id: number,
  payload: { title: string; content: string }
): Promise<Post> =>
  api
    .patch<{ data: Post }>(`/post/${id}`, payload)
    .then((res) => res.data.data);

export const deletePost = (id: number): Promise<void> =>
  api.delete<void>(`/post/${id}`).then(() => {});

export interface Category {
  id: number;
  name: string;
}
