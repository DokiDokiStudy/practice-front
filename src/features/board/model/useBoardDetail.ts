import { useQuery } from "@tanstack/react-query";
import { GetResponse } from "@/shared/types/getResponse";
import { fetchPost, type Post } from "@/entities/post";

export function useBoardDetail(id: number | undefined) {
  return useQuery<GetResponse<Post>>({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}
