import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category, getCategories } from "@/entities/category";

export const useDockerCategories = () => {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    placeholderData: [],
  });

  const flatDockerCategories = useMemo(() => {
    const dockerCategory = categories.find((cat) => cat.name === "Docker");
    if (!dockerCategory) {
      console.warn("Docker 카테고리를 찾을 수 없습니다:", categories);
      return [];
    }

    const flattenDockerCategories = (cats: Category[]): Category[] => {
      if (!Array.isArray(cats)) {
        return [];
      }

      const result: Category[] = [];
      cats.forEach((cat) => {
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
    return categories.find((cat) => cat.name === "Docker") || null;
  }, [categories]);

  return {
    dockerCategory,
    flatDockerCategories,
    isLoading,
    error,
  };
};
