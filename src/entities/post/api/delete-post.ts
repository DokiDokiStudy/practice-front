import { api } from "@/shared/api";

export const deletePost = async (id: number): Promise<void> => {
  try {
    await api.delete<void>(`/posts/${id}`);
  } catch (error) {
    throw error;
  }
};
