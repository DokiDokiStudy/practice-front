import api from "@/shared/api";

export type ReactionType = "like" | "disLike";

export interface LikeResponse {
  message: string;
  data?: { id: number };
}

/**
 * 포스트에 좋아요/싫어요 반응 추가/변경/취소
 * @param postId - 포스트 ID
 * @param reactionType - "like" 또는 "disLike"
 */
export async function togglePostReaction(
  postId: number,
  reactionType: ReactionType
): Promise<LikeResponse> {
  try {
    const response = await api.post(`/likes/post/${postId}`, {
      reactionType,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * 댓글에 좋아요/싫어요 반응 추가/변경/취소
 * @param commentId - 댓글 ID
 * @param reactionType - "like" 또는 "disLike"
 */
export async function toggleCommentReaction(
  commentId: number,
  reactionType: ReactionType
): Promise<LikeResponse> {
  const response = await api.post(`/likes/comment/${commentId}`, {
    reactionType,
  });
  return response.data;
}

export async function likePost(postId: number) {
  return togglePostReaction(postId, "like");
}

export async function dislikePost(postId: number) {
  return togglePostReaction(postId, "disLike");
}

// UI 아직 안만듦
export async function likeComment(commentId: number) {
  return toggleCommentReaction(commentId, "like");
}

export async function dislikeComment(commentId: number) {
  return toggleCommentReaction(commentId, "disLike");
}
