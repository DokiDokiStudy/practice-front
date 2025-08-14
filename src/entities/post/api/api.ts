import api from "@/lib/api";
import type {
  Post,
  PostsResponse,
  CreatePostRequest,
  UpdatePostRequest,
} from "../model/types";

export const postApi = {
  async getPosts(page = 1, limit = 10): Promise<PostsResponse> {
    const response = await api.get<PostsResponse>(
      `/post?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  async getPost(id: number): Promise<Post> {
    const response = await api.get(`/post/${id}`);
    return response.data.data;
  },

  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await api.post<{ data: Post }>("/posts", data);
    return response.data.data;
  },

  async updatePost(id: number, data: UpdatePostRequest): Promise<Post> {
    const response = await api.patch<{ data: Post }>(`/post/${id}`, data);
    return response.data.data;
  },

  async deletePost(id: number): Promise<void> {
    await api.delete(`/post/${id}`);
  },
};
