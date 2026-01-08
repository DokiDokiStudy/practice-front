import { api } from "@/shared/api";

export async function deleteThread(id: number): Promise<void> {
  await api.delete(`/posts/${id}`);
}
