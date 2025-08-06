import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost } from "@/api/Likes";

// 게시글 좋아요 등록
export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boardList"] });
    },
  });
}

// 게시글 좋아요 취소
export function useUnlikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boardList"] });
    },
  });
}
