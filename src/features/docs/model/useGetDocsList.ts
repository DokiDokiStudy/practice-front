import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/entities/category";
import type { DocsCategory } from "@/shared/types";
import { transformCategoriesToDocs } from "../lib/transformCategoriesToDocs";

export const useGetDocsList = (): DocsCategory[] => {
  const { data: categories = [] } = useQuery(categoryKeys.list());

  return transformCategoriesToDocs(categories);
};
