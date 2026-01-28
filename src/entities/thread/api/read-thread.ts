import { api } from "@/shared/api";
import { dummyThreads } from "../__mocks__/dummyThreads";
import type { Thread } from "../model";

export async function readThread(id: number): Promise<Thread> {
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
