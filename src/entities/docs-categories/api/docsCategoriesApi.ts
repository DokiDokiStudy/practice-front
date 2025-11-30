import type { DocsCategory } from "../model/types";
import { mockDocsData } from "../__mocks__/mockDocsData";

export const fetchDocsCategories = async (): Promise<DocsCategory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDocsData);
    }, 100);
  });
};

export const fetchDocsCategoryById = async (
  categoryId: string
): Promise<DocsCategory | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const category = mockDocsData.find((doc) => doc.id === categoryId);
      resolve(category);
    }, 100);
  });
};
