import api from "@/lib/api";

export type LikeResponse = {
  message: string;
  [key: string]: any;
};

// 게시글 좋아요 등록
export async function likePost(postId: number): Promise<LikeResponse> {
  const res = await api.post(`/likes/${postId}`);
  return res.data;
}

// 게시글 좋아요 취소
export async function unlikePost(postId: number): Promise<LikeResponse> {
  const res = await api.delete(`/likes/${postId}`);
  return res.data;
}
