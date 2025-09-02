import { useEffect, useState } from "react";
import { docsData } from "./data";

interface Step {
  id: string;
  title: string;
}

interface Chapter {
  id: string;
  title: string;
  steps: Step[];
}

interface DocsSection {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface Category {
  id: string;
  name: string;
  parentId: string | null;
  groupId: string | null;
}
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
