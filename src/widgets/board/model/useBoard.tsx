import { postKeys } from "@/entities/post";
import { useQuery } from "@tanstack/react-query";

export const useBoard = (id: number) => {
  const postQuery = useQuery(postKeys.detail(id));
  return postQuery;
};
