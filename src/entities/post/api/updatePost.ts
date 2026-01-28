import { api } from "@/shared/api";
import { Post } from "../model";

export const updatePost = async (
  id: number,
  payload: { title: string; content: string }
): Promise<Post> => {
  try {
    const res = await api.patch<{ data: Post }>(`/posts/${id}`, payload);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};
