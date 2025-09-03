import { api } from "@/shared/api";

export const getBoard = async () => {
  const res = await api.get("/post");
  return res.data.data;
};

export const getBoardDetail = async (postId: number) => {
  const res = await api.get(`/post/${postId}`);
};
