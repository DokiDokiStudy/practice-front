import { api } from "@/shared/api";
import { Post } from "../model";

export const updatePost = (
  id: number,
  payload: { title: string; content: string }
): Promise<Post> =>
  api
    .patch<{ data: Post }>(`/post/${id}`, payload)
    .then((res) => res.data.data);
