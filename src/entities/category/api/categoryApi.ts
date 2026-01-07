import { api } from "@/shared/api";
import { Category } from "../model/types";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await api.get("/categories");

    const categories = res.data.data?.categories || [];

    if (!Array.isArray(categories)) {
      console.warn("Categories is not an array:", categories);
      return [];
    }

    return categories;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
