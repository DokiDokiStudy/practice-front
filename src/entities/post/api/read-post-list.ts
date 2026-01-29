import { api } from "@/shared/api";
import { PostListGetResponse } from "../model";
import type { GetResponse } from "@/shared/types/getResponse";

export const readPostList = (
  page = 1,
  limit = 10
): Promise<PostListGetResponse> =>
  api
    .get<GetResponse<PostListGetResponse>>(`/posts?page=${page}&limit=${limit}`)
    .then((res) => res.data.data);

export const readPostListFilterWithCategory = (
  category: number,
  page = 1,
  limit = 100
): Promise<PostListGetResponse> =>
  api
    .get<
      GetResponse<PostListGetResponse>
    >(`/categories/${category}/posts?page=${page}&limit=${limit}`)
    .then((res) => res.data.data);
