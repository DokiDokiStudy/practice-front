import { useCategories } from "@/features/category";
import { CONTENT_ITEMS } from "./content";

export const mainCategories = () => {
  const { data } = useCategories();

  const contentCategories = CONTENT_ITEMS.map((item) => {
    // 추후 모든 컨텐츠 대분류 생길시 삭제
    const targetCategory = data?.find(
      (category) => category.name === item.name
    );
    if (targetCategory) {
      return {
        ...item,
        link: `/docs/${targetCategory.id}`,
      };
    }
    return item;
  });

  return contentCategories;
};
