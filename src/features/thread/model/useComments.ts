import { createComment, fetchComments } from "@/entities/comment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 댓글 목록 조회 - 사용 어떻게 해야할 지 감이 안잡혀서 일단 만들기만 함
export function useComments(postId: number) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });
}

// 댓글 등록
export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => createComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
}
