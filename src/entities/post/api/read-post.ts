import { api } from "@/shared/api";
import { Post } from "../model";
import type { GetResponse } from "@/shared/types/getResponse";

export const readPost = (id: number): Promise<Post> =>
  api.get(`/posts/${id}`).then((res) => res.data.data);
