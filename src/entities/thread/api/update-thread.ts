import { api } from "@/shared/api";
import type { Thread, ThreadUpdateDto } from "../model";

export async function updateThread(
  id: number,
  data: ThreadUpdateDto
): Promise<Thread> {
  const res = await api.patch(`/posts/${id}`, data);
  return res.data.post ?? res.data.data?.post;
}
