import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, Category } from '@/api/Categories';

/**
 * Docker 카테고리 전용 훅
 * - name이 "Docker"인 카테고리를 환경에 관계없이 동적으로 찾아서 추출
 * - 하위 카테고리들을 평면화하여 반환
 * - 환경별로 ID가 다를 수 있어서 name 기반으로 안전하게 찾음.. 필터링 방법 필요해보임
 */
export const useDockerCategories = () => {
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    placeholderData: [],
  });

  const flatDockerCategories = useMemo(() => {
    const dockerCategory = categories.find(cat => cat.name === "Docker");
    if (!dockerCategory) {
      console.warn('Docker 카테고리를 찾을 수 없습니다:', categories);
      return [];
    }
    
    const flattenDockerCategories = (cats: Category[]): Category[] => {
      if (!Array.isArray(cats)) {
        return [];
      }
      
      const result: Category[] = [];
      cats.forEach(cat => {
        if (cat.name !== "Docker") {
          result.push(cat);
        }
        if (cat.children && Array.isArray(cat.children)) {
          result.push(...flattenDockerCategories(cat.children));
        }
      });
      return result;
    };
    
    return flattenDockerCategories([dockerCategory]);
  }, [categories]);

  const dockerCategory = useMemo(() => {
    return categories.find(cat => cat.name === "Docker") || null;
  }, [categories]);

  return {
    dockerCategory,
    flatDockerCategories,
    isLoading,
    error,
  };
};
