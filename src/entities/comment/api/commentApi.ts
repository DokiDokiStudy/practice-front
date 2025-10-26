import { api } from "@/shared/api";
import { Comment } from "../model";

export async function fetchComments(postId: number): Promise<Comment[]> {
  const res = await api.get(`/comments/${postId}`);
  return res.data.comments ?? res.data.data ?? [];
}

export async function createComment(
  postId: number,
  content: string
): Promise<Comment> {
  const res = await api.post(`/comments/${postId}`, { content });
  return res.data;
}
