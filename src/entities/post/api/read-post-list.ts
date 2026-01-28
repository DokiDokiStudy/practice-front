import { api } from "@/shared/api";
import { PostListGetResponse } from "../model";
import type { GetResponse } from "@/shared/types/getResponse";

export const getPostList = async (
  params?: URLSearchParams,
): Promise<PostListGetResponse> => {
  const queryString = params?.toString();

  try {
    const res = await api.get<GetResponse<PostListGetResponse>>(
      `/posts${queryString ? `?${queryString}` : ""}`,
    );

    return res.data.data;
  } catch (error) {
    throw error;
  }
};
