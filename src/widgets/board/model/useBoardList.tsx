import { postKeys } from "@/entities/post";
import { useQuery } from "@tanstack/react-query";

export const useBoardList = (page: number, limit: number = 10) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const postQuery = useQuery(postKeys.list(params));

  return {
    ...postQuery,
    posts: postQuery.data?.posts ?? [],
    totalPages: postQuery.data?.meta?.totalPages ?? 1,
    total: postQuery.data?.meta?.total ?? 0,
  };
};
