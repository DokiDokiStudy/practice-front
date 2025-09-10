import { useEffect, useState } from "react";
import { docsData } from "./data";
import type { DocsSection } from "./types";

export function useDocsData(): DocsSection[] {
  const [docs, setDocs] = useState<DocsSection[]>(docsData);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setDocs(docsData);
        return;
      } catch (err) {
        setDocs(docsData);
      }
    };

    fetchDocs();
  }, []);

  return docs;
}
