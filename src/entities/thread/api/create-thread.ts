import { api } from "@/shared/api";
import type { Thread, ThreadCreateDto } from "../model";

export async function createThread(data: ThreadCreateDto): Promise<Thread> {
  const res = await api.post("/posts", data);
  return res.data.post ?? res.data.data?.post;
}
