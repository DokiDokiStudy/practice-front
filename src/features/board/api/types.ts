import type { Post } from "@/types";

export interface PostsResponse {
  data: Post[];
  meta: {
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}

export interface CreatePostRequest {
  categoryId: number;
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}

export interface Category {
  id: number;
  name: string;
}

export type { Post };
