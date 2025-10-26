import { api } from "@/shared/api";
import { Thread, ThreadCreateDto, ThreadUpdateDto } from "../model";
import { dummyThreads } from "../__mocks__/dummyThreads";

export async function fetchThreads(): Promise<Thread[]> {
  try {
    const res = await api.get("/posts");
    const threads = res.data.posts ?? res.data.data?.posts ?? [];
    return threads.length > 0 ? threads : dummyThreads;
  } catch {
    return dummyThreads;
  }
}

export async function fetchThreadsByCategory(
  categoryId: number
): Promise<Thread[]> {
  try {
    const res = await api.get(`/posts?categoryId=${categoryId}`);
    const threads = res.data.posts ?? res.data.data?.posts ?? [];
    return threads.length > 0
      ? threads
      : dummyThreads.filter((t) => t.categoryId === categoryId);
  } catch {
    return dummyThreads.filter((t) => t.categoryId === categoryId);
  }
}

export async function fetchThreadById(id: number): Promise<Thread> {
  try {
    const res = await api.get(`/posts/${id}`);
    const thread = res.data.post ?? res.data.data?.post;
    return thread ?? dummyThreads.find((t) => t.id === id)!;
  } catch {
    const found = dummyThreads.find((t) => t.id === id);
    if (!found) throw new Error("Thread not found");
    return found;
  }
}

export async function createThread(data: ThreadCreateDto): Promise<Thread> {
  const res = await api.post("/posts", data);
  return res.data.post ?? res.data.data?.post;
}

export async function updateThread(
  id: number,
  data: ThreadUpdateDto
): Promise<Thread> {
  const res = await api.patch(`/posts/${id}`, data);
  return res.data.post ?? res.data.data?.post;
}

export async function deleteThread(id: number): Promise<void> {
  await api.delete(`/posts/${id}`);
}

// 아직 미구현 API
export async function fetchCommentsByThreadId(
  postId: number
): Promise<Comment[]> {
  return [];
}
