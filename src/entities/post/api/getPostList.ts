import { api } from "@/shared/api";
import { PostListGetResponse } from "../model";
import type { GetResponse } from "@/shared/types/getResponse";

export const getPostList = (
  page = 1,
  limit = 10
): Promise<PostListGetResponse> =>
  api
    .get<GetResponse<PostListGetResponse>>(`/posts?page=${page}&limit=${limit}`)
    .then((res) => res.data.data);
