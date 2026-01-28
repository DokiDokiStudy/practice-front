import { api } from "@/shared/api";
import { Post } from "../model";

export const getPost = async (id: number): Promise<Post> => {
  try {
    const res = await api.get(`/posts/${id}`);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};
