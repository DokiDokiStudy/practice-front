import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePostReaction, toggleCommentReaction, ReactionType } from '@/api/Likes';

/**
 * 포스트 좋아요/싫어요 토글 훅
 */
export const usePostReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, reactionType }: { postId: number; reactionType: ReactionType }) =>
      togglePostReaction(postId, reactionType),
    onSuccess: (data, variables) => {
      
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: ['threads'] });
      queryClient.invalidateQueries({ queryKey: ['thread', variables.postId.toString()] });
    },
    onError: (error, variables) => {
      console.error(`Post ${variables.reactionType} failed:`, error);
    },
  });
};

/**
 * 댓글 좋아요/싫어요 토글 훅
 */
export const useCommentReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, reactionType }: { commentId: number; reactionType: ReactionType }) =>
      toggleCommentReaction(commentId, reactionType),
    onSuccess: (data, variables) => {
      // 댓글이 속한 쓰레드의 댓글 목록 무효화
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: (error, variables) => {
      console.error(`Comment ${variables.reactionType} failed:`, error);
    },
  });
};

/**
 * 편의를 위한 개별 훅들.......
 */
export const usePostLike = () => {
  const postReaction = usePostReaction();
  
  return {
    ...postReaction,
    mutate: (postId: number) => postReaction.mutate({ postId, reactionType: 'like' }),
    mutateAsync: (postId: number) => postReaction.mutateAsync({ postId, reactionType: 'like' }),
  };
};

export const usePostDislike = () => {
  const postReaction = usePostReaction();
  
  return {
    ...postReaction,
    mutate: (postId: number) => postReaction.mutate({ postId, reactionType: 'disLike' }),
    mutateAsync: (postId: number) => postReaction.mutateAsync({ postId, reactionType: 'disLike' }),
  };
};

export const useCommentLike = () => {
  const commentReaction = useCommentReaction();
  
  return {
    ...commentReaction,
    mutate: (commentId: number) => commentReaction.mutate({ commentId, reactionType: 'like' }),
    mutateAsync: (commentId: number) => commentReaction.mutateAsync({ commentId, reactionType: 'like' }),
  };
};

export const useCommentDislike = () => {
  const commentReaction = useCommentReaction();
  
  return {
    ...commentReaction,
    mutate: (commentId: number) => commentReaction.mutate({ commentId, reactionType: 'disLike' }),
    mutateAsync: (commentId: number) => commentReaction.mutateAsync({ commentId, reactionType: 'disLike' }),
  };
};
