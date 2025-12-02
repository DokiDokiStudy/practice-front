import { postKeys } from "@/entities/post";
import { useQuery } from "@tanstack/react-query";

export const useBoardList = (page: number, limit: number = 10) => {
  const postQuery = useQuery(postKeys.list(page, limit));

  return {
    ...postQuery,
    posts: postQuery.data?.posts ?? [],
    totalPages: postQuery.data?.meta?.totalPages ?? 1,
    total: postQuery.data?.meta?.total ?? 0,
  };
};
