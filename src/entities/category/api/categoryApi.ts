import { api } from "@/shared/api";
import { Category } from "../model/types";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await api.get("/categories");
    const categories = res.data.data?.categories || res.data.categories || [];

    if (!Array.isArray(categories)) {
      console.warn("Categories is not an array:", categories);
      return [];
    }

    return categories;
  } catch (error) {
    return [];
  }
}
