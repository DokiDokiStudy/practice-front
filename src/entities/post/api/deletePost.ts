import { api } from "@/shared/api";

export const deletePost = (id: number): Promise<void> =>
  api.delete<void>(`/post/${id}`).then(() => {});
