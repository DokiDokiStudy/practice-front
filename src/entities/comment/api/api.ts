import api from "@/shared/api";

// 댓글 목록 조회
export async function fetchComments(postId: number): Promise<Comment[]> {
  const res = await api.get(`/comments/${postId}`);
  return res.data.comments ?? res.data.data;
}

// 댓글 등록
export async function createComment(
  postId: number,
  content: string
): Promise<Comment> {
  const res = await api.post(`/comments/${postId}`, { content });
  return res.data;
}
