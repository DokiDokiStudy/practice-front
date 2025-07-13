import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/api/Posts';
import type { Category } from '@/api/Posts';

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });
}
