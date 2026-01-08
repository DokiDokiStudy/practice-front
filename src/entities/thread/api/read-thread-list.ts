import { api } from "@/shared/api";
import { dummyThreads } from "../__mocks__/dummyThreads";
import type { Thread } from "../model";

const filterThreadListByCategory = (categoryId: number) =>
  dummyThreads.filter((t) => t.categoryId === categoryId);

export async function readThreadList(params?: {
  categoryId: number;
}): Promise<Thread[]> {
  try {
    const res = await api.get(
      `/posts${params?.categoryId ? `?categoryId=${params.categoryId}` : ""}`
    );
    const threads = res.data.posts ?? res.data.data?.posts ?? [];
    return threads.length > 0
      ? threads
      : params?.categoryId
        ? filterThreadListByCategory(params.categoryId)
        : dummyThreads;
  } catch {
    return params?.categoryId
      ? filterThreadListByCategory(params.categoryId)
      : dummyThreads;
  }
}
