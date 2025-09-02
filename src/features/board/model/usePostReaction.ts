import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactionType, togglePostReaction } from "@/entities/like";
import { useAuth } from "@/features/auth";

export const usePostReaction = (initialLikes = 0, initialDislikes = 0) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    null
  );
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [dislikeCount, setDislikeCount] = useState(initialDislikes);

  const postMutation = useMutation({
    mutationFn: ({
      postId,
      reactionType,
    }: {
      postId: number;
      reactionType: ReactionType;
    }) => togglePostReaction(postId, reactionType),
    onSuccess: (data, variables) => {
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      queryClient.invalidateQueries({
        queryKey: ["thread", variables.postId.toString()],
      });
    },
    onError: (error, variables) => {
      console.error(`Post ${variables.reactionType} failed:`, error);
    },
  });

  const handleReactionClick = async (
    postId: number,
    type: "like" | "dislike"
  ) => {
    if (!user) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (type === "like") {
      const prevLikeCount = likeCount;
      const prevDislikeCount = dislikeCount;
      const prevReaction = userReaction;

      try {
        if (userReaction === "like") {
          setLikeCount((prev) => Math.max(0, prev - 1));
          setUserReaction(null);
        } else {
          if (userReaction === "dislike") {
            setDislikeCount((prev) => Math.max(0, prev - 1));
          }
          setLikeCount((prev) => prev + 1);
          setUserReaction("like");
        }

        await postMutation.mutateAsync({ postId, reactionType: "like" });
      } catch (error) {
        setLikeCount(prevLikeCount);
        setDislikeCount(prevDislikeCount);
        setUserReaction(prevReaction);

        alert(
          "좋아요 처리 중 오류가 발생했습니다. 로그인 상태를 확인해주세요."
        );
      }
    } else if (type === "dislike") {
      const prevLikeCount = likeCount;
      const prevDislikeCount = dislikeCount;
      const prevReaction = userReaction;

      try {
        if (userReaction === "dislike") {
          setDislikeCount((prev) => Math.max(0, prev - 1));
          setUserReaction(null);
        } else {
          if (userReaction === "like") {
            setLikeCount((prev) => Math.max(0, prev - 1));
          }
          setDislikeCount((prev) => prev + 1);
          setUserReaction("dislike");
        }

        await postMutation.mutateAsync({ postId, reactionType: "disLike" });
      } catch (error) {
        setLikeCount(prevLikeCount);
        setDislikeCount(prevDislikeCount);
        setUserReaction(prevReaction);

        console.error("싫어요 처리 실패:", error);
        alert(
          "싫어요 처리 중 오류가 발생했습니다. 로그인 상태를 확인해주세요."
        );
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
    isLikePending: postMutation.isPending,
    isDislikePending: postMutation.isPending,
  };
};

/**
 * 편의를 위한 개별 훅들
 */
export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => togglePostReaction(postId, "like"),
    onSuccess: (data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      queryClient.invalidateQueries({
        queryKey: ["thread", postId.toString()],
      });
    },
    onError: (error) => {
      console.error("Post like failed:", error);
    },
  });
};

export const usePostDislike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => togglePostReaction(postId, "disLike"),
    onSuccess: (data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      queryClient.invalidateQueries({
        queryKey: ["thread", postId.toString()],
      });
    },
    onError: (error) => {
      console.error("Post dislike failed:", error);
    },
  });
};
