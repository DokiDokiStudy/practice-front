import { useEffect, useState } from "react";
import {
  fetchDocsCategories,
  type DocsCategory,
} from "@/entities/docs-categories";

export function useDocsData(): DocsCategory[] {
  const [docs, setDocs] = useState<DocsCategory[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const data = await fetchDocsCategories();
        setDocs(data);
      } catch (err) {
        console.error("Failed to fetch docs:", err);
        setDocs([]);
      }
    };

    fetchDocs();
  }, []);

  return docs;
}
