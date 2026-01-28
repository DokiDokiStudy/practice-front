import { queryOptions } from "@tanstack/react-query";
import { getCategories } from "./categoryApi";

export const categoryKeys = {
  all: ["categories"] as const,
  list: () =>
    queryOptions({
      queryKey: [...categoryKeys.all, "list"],
      queryFn: () => getCategories(),
      placeholderData: (prev) => prev,
    }),
};
