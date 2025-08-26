import { likePost } from "@/entities/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
