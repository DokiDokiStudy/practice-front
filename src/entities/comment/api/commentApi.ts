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
  const res = await api.post(`/comments`, { postId, content });
  return res.data;
}

export async function updateComment(
  commentId: number,
  content: string
): Promise<void> {
  await api.patch(`/comments/${commentId}`, { content });
}

export async function deleteComment(commentId: number): Promise<void> {
  await api.delete(`/comments/${commentId}`);
}
