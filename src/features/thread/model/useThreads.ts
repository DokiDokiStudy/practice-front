import { createThread, deleteThread, updateThread } from "@/entities/thread";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 쓰레드 생성 mutation
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

// 쓰레드 수정 mutation
export const useUpdateThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateThread(id, data),
    onSuccess: (updatedThread) => {
      // 특정 쓰레드와 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      queryClient.setQueryData(["threads", updatedThread.id], updatedThread);
    },
    onError: (error) => {
      console.error("쓰레드 수정 실패:", error);
    },
  });
};

// 쓰레드 삭제 mutation
export const useDeleteThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteThread(id),
    onSuccess: () => {
      // 쓰레드 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
    onError: (error) => {
      console.error("쓰레드 삭제 실패:", error);
    },
  });
};
