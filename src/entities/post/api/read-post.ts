import { api } from "@/shared/api";
import { Post } from "../model";
import type { GetResponse } from "@/shared/types/getResponse";

export const readPost = (id: number): Promise<GetResponse<Post>> =>
  api.get(`/post/${id}`).then((res) => res.data.data);
