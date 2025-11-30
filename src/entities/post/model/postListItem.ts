import type { Post } from "@/entities/post";

export type PostListItem = Omit<Post, "user" | "category" | "views">;

export interface PostListGetResponse {
  posts: PostListItem[];
  meta: {
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}
