import { queryOptions } from "@tanstack/react-query";
import { fetchCategories } from "./categoryApi";

export const categoryKeys = {
  all: ["categories"] as const,
  list: () =>
    queryOptions({
      queryKey: [...categoryKeys.all, "list"],
      queryFn: () => fetchCategories(),
      placeholderData: (prev) => prev,
    }),
};
