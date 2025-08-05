import { useState } from 'react';
import { usePostLike, usePostDislike } from './useLikes';
import { useAuth } from './useAuth';

export const usePostReaction = (initialLikes = 0, initialDislikes = 0) => {
  const { user } = useAuth();
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [dislikeCount, setDislikeCount] = useState(initialDislikes);

  const likeMutation = usePostLike();
  const dislikeMutation = usePostDislike();

  const handleReactionClick = async (postId: number, type: "like" | "dislike") => {
    if (!user) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }
    
    if (type === "like") {
      const prevLikeCount = likeCount;
      const prevDislikeCount = dislikeCount;
      const prevReaction = userReaction;
      
      try {
        if (userReaction === "like") {
          setLikeCount(prev => Math.max(0, prev - 1));
          setUserReaction(null);
        } else {
          if (userReaction === "dislike") {
            setDislikeCount(prev => Math.max(0, prev - 1));
          }
          setLikeCount(prev => prev + 1);
          setUserReaction("like");
        }
        
        await likeMutation.mutateAsync(postId);
      } catch (error) {
        setLikeCount(prevLikeCount);
        setDislikeCount(prevDislikeCount);
        setUserReaction(prevReaction);
        
        alert('좋아요 처리 중 오류가 발생했습니다. 로그인 상태를 확인해주세요.');
      }
    } else if (type === "dislike") {
      const prevLikeCount = likeCount;
      const prevDislikeCount = dislikeCount;
      const prevReaction = userReaction;
      
      try {
        if (userReaction === "dislike") {
          setDislikeCount(prev => Math.max(0, prev - 1));
          setUserReaction(null);
        } else {
          if (userReaction === "like") {
            setLikeCount(prev => Math.max(0, prev - 1));
          }
          setDislikeCount(prev => prev + 1);
          setUserReaction("dislike");
        }
        
        await dislikeMutation.mutateAsync(postId);
      } catch (error) {
        setLikeCount(prevLikeCount);
        setDislikeCount(prevDislikeCount);
        setUserReaction(prevReaction);
        
        console.error('싫어요 처리 실패:', error);
        alert('싫어요 처리 중 오류가 발생했습니다. 로그인 상태를 확인해주세요.');
      }
    }
  };

  // 초기값 업데이트 함수
  const updateCounts = (likes: number, dislikes: number) => {
    if (likeCount === 0 && dislikeCount === 0) {
      setLikeCount(likes);
      setDislikeCount(dislikes);
    }
  };

  return {
    userReaction,
    likeCount,
    dislikeCount,
    handleReactionClick,
    updateCounts,
    isLikePending: likeMutation.isPending,
    isDislikePending: dislikeMutation.isPending,
  };
};
