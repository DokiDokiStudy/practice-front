import api from "@/lib/api";

export type Category = {
  id: number;
  name: string;
  children: Category[];
};

export async function fetchCategories(): Promise<Category[]> {
  const res = await api.get("/category");
  // 백엔드 응답 구조에 따라 categories 배열 반환
  return res.data.categories ?? res.data.data;
}
