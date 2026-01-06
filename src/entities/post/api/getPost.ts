import { api } from "@/shared/api";
import { Post } from "../model";

export const getPost = (id: number): Promise<Post> =>
  api.get(`/posts/${id}`).then((res) => res.data?.data);
