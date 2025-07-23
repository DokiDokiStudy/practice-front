import { useQuery } from '@tanstack/react-query';
import { fetchCategories, Category } from '@/api/Categories';

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });
}
