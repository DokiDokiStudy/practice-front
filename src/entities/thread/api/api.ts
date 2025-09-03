import { api } from "@/shared/api";
import { Thread, ThreadCreateDto, ThreadUpdateDto } from "../model";
import { dummyThreads } from "../fix";

export async function fetchThreads(): Promise<Thread[]> {
  try {
    const res = await api.get("/posts");
    const threads = res.data.posts ?? res.data.data?.posts ?? [];

    // 빈 배열이면 더미 데이터 사용
    if (threads.length === 0) {
      return dummyThreads;
    }
    return threads;
  } catch (error) {
    return dummyThreads;
  }
}

// 카테고리별 쓰레드 목록 조회
export async function fetchThreadsByCategory(
  categoryId: number
): Promise<Thread[]> {
  try {
    const res = await api.get(`/posts?categoryId=${categoryId}`);
    const threads = res.data.posts ?? res.data.data?.posts ?? [];

    if (threads.length === 0) {
      // 더미 데이터에서 해당 카테고리 필터링
      const filtered = dummyThreads.filter(
        (thread) => thread.categoryId === categoryId
      );
      return filtered;
    }

    return threads;
  } catch (error) {
    return dummyThreads.filter((thread) => thread.categoryId === categoryId);
  }
}

// 특정 쓰레드 조회
export async function fetchThreadById(id: number): Promise<Thread> {
  try {
    const res = await api.get(`/posts/${id}`);
    const thread = res.data.post ?? res.data.data?.post;

    if (!thread) {
      const found = dummyThreads.find((t) => t.id === id);
      if (!found) {
        throw new Error("Thread not found");
      }
      return found;
    }

    return thread;
  } catch (error) {
    const found = dummyThreads.find((t) => t.id === id);
    if (!found) {
      throw new Error("Thread not found");
    }
    return found;
  }
}

// 쓰레드 생성
export async function createThread(data: ThreadCreateDto): Promise<Thread> {
  const res = await api.post("/posts", data);
  return res.data.post ?? res.data.data?.post;
}

// 쓰레드 수정
export async function updateThread(
  id: number,
  data: ThreadUpdateDto
): Promise<Thread> {
  const res = await api.patch(`/posts/${id}`, data);
  return res.data.post ?? res.data.data?.post;
}

// 쓰레드 삭제
export async function deleteThread(id: number): Promise<void> {
  await api.delete(`/posts/${id}`);
}

// 댓글 목록 조회 - 임시 비활성화 (백엔드 API 없음)
// Post 기준으로 comments 찾아내야함
export async function fetchCommentsByThreadId(
  postId: number
): Promise<Comment[]> {
  try {
    // 백엔드에 post별 댓글 조회 API가 없어서 임시로 빈 배열 반환
    // const res = await api.get(`/comments/post/${postId}`);
    // return res.data.comments ?? res.data.data?.comments ?? [];
    return [];
  } catch (error) {
    return [];
  }
}
