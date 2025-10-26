import { api } from "@/shared/api";
import { Post, PostsResponse } from "../model";

export const fetchPosts = (page = 1, limit = 10): Promise<PostsResponse> =>
  api
    .get<PostsResponse>(`/post?page=${page}&limit=${limit}`)
    .then((res) => res.data);

export const fetchPost = (id: number): Promise<Post> =>
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
