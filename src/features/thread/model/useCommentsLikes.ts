import { ReactionType, toggleCommentReaction } from "@/entities/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 댓글 좋아요/싫어요 토글 훅
 */
export const useCommentReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      reactionType,
    }: {
      commentId: number;
      reactionType: ReactionType;
    }) => toggleCommentReaction(commentId, reactionType),
    onSuccess: (data, variables) => {
      // 댓글이 속한 쓰레드의 댓글 목록 무효화
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error, variables) => {
      console.error(`Comment ${variables.reactionType} failed:`, error);
    },
  });
};

export const useCommentLike = () => {
  const commentReaction = useCommentReaction();

  return {
    ...commentReaction,
    mutate: (commentId: number) =>
      commentReaction.mutate({ commentId, reactionType: "like" }),
    mutateAsync: (commentId: number) =>
      commentReaction.mutateAsync({ commentId, reactionType: "like" }),
  };
};

export const useCommentDislike = () => {
  const commentReaction = useCommentReaction();

  return {
    ...commentReaction,
    mutate: (commentId: number) =>
      commentReaction.mutate({ commentId, reactionType: "disLike" }),
    mutateAsync: (commentId: number) =>
      commentReaction.mutateAsync({ commentId, reactionType: "disLike" }),
  };
};
