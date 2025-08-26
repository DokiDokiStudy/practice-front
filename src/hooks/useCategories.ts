import { Category, fetchCategories } from "@/entities/category";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });
}
