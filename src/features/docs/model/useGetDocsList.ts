import { useQuery } from "@tanstack/react-query";
import { Category, categoryKeys } from "@/entities/category";
import type { Chapter, DocsCategory } from "@/shared/types";
import { transformCategoriesToDocs } from "../lib/transformCategoriesToDocs";

export const useGetDocsList = (): Chapter[] => {
  const { data: categories = [] } = useQuery(categoryKeys.list());

  return transformCategoriesToDocs(categories);
};
