import { createThread } from "@/entities/thread";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createThread(data),
    onSuccess: () => {
      // 쓰레드 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
    onError: (error) => {
      console.error("쓰레드 생성 실패:", error);
    },
  });
};
