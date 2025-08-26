import api from "@/shared/api";
import { LikeResponse, ReactionType } from "../model";

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

export async function likeComment(commentId: number) {
  return toggleCommentReaction(commentId, "like");
}

export async function dislikeComment(commentId: number) {
  return toggleCommentReaction(commentId, "disLike");
}
