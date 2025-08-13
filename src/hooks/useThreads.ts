import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchThreads, 
  fetchThreadsByCategory, 
  fetchThreadById, 
  createThread, 
  updateThread, 
  deleteThread,
  createComment,
  Thread,
  CreateThreadRequest,
  UpdateThreadRequest,
  CommentCreateDto
} from '@/api/Threads';

// 모든 쓰레드 가져오기
export const useThreads = () => {
  return useQuery({
    queryKey: ['threads'],
    queryFn: fetchThreads,
    staleTime: 5 * 60 * 1000,
    placeholderData: [],
  });
};

// 카테고리별 쓰레드 가져오기
export const useThreadsByCategory = (categoryId: number) => {
  return useQuery({
    queryKey: ['threads', 'category', categoryId],
    queryFn: () => fetchThreadsByCategory(categoryId),
    enabled: categoryId > 0, // categoryId가 유효할 때만 실행
    staleTime: 5 * 60 * 1000,
    placeholderData: [],
  });
};

// 특정 쓰레드 가져오기
export const useThread = (threadId: number) => {
  return useQuery({
    queryKey: ['threads', threadId],
    queryFn: () => fetchThreadById(threadId),
    enabled: threadId > 0, // threadId가 유효할 때만 실행
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 쓰레드 생성 mutation
export const useCreateThread = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateThreadRequest) => createThread(data),
    onSuccess: () => {
      // 쓰레드 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
    onError: (error) => {
      console.error('쓰레드 생성 실패:', error);
    },
  });
};

// 쓰레드 수정 mutation
export const useUpdateThread = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateThreadRequest }) => 
      updateThread(id, data),
    onSuccess: (updatedThread) => {
      // 특정 쓰레드와 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['threads'] });
      queryClient.setQueryData(['threads', updatedThread.id], updatedThread);
    },
    onError: (error) => {
      console.error('쓰레드 수정 실패:', error);
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
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
    onError: (error) => {
      console.error('쓰레드 삭제 실패:', error);
    },
  });
};

// 댓글 생성 mutation
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CommentCreateDto) => createComment(data),
    retry: false,
    onSuccess: (newComment, variables) => {
      queryClient.invalidateQueries({ queryKey: ['threads', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
    onError: (error) => {
      console.error('댓글 생성 실패:', error);
    },
  });
};
