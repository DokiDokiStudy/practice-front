import { api } from "@/shared/api";
import { Post } from "../model";

export const createPost = async (payload: {
  categoryId: number;
  title: string;
  content: string;
}): Promise<Post> => {
  try {
    const res = await api.post<{ data: Post }>("/posts", payload);

    return res.data.data;
  } catch (error) {
    console.error("[createPost] Error:", error);
    throw error;
  }
};
