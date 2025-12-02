import { api } from "@/shared/api";
import { Post } from "../model";

export const createPost = (payload: {
  categoryId: number;
  title: string;
  content: string;
}): Promise<Post> =>
  api.post<{ data: Post }>("/posts", payload).then((res) => res.data.data);
