import api from "@/lib/api";

export type Category = {
  id: number;
  name: string;
  children: Category[];
};

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await api.get("/categories");
    console.log('Categories API response:', res.data);

    console.log('first Categories', res.data.data?.categories);

    console.log('middle Categories', res.data.data?.categories[2].children);

    console.log('small Categories', res.data.data?.categories[2].children[0]);
    console.log('small Categories', res.data.data?.categories[2].children[1]);
    
    const categories = res.data.data?.categories || res.data.categories || [];
    
    // 배열인지 확인
    if (!Array.isArray(categories)) {
      console.warn('Categories is not an array:', categories);
      return [];
    }
    
    return categories;
  } catch (error) {
    return [];
  }
}
