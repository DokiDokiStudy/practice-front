import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { fetchCategories } from '@/api/Categories';
import { docsData as fallbackDocsData } from '@/data/docsData';

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
  const [docs, setDocs] = useState<DocsSection[]>(fallbackDocsData);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setDocs(fallbackDocsData);
        return;

        // TODO: Categories API 응답 구조에 맞춰 변환 로직 구현 필요
        const categories = await fetchCategories();

        if (!Array.isArray(categories) || categories.length === 0) {
          setDocs(fallbackDocsData);
          return;
        }

        // 계층구조 데이터를 DocsSection 구조로 변환
        const transformedDocs = categories.map(category => ({
          id: category.id.toString(),
          title: category.name,
          chapters: category.children.map(child => ({
            id: child.id.toString(),
            title: child.name,
            steps: child.children.map(grandchild => ({
              id: grandchild.id.toString(),
              title: grandchild.name
            }))
          }))
        }));

        setDocs(transformedDocs);
      } catch (err) {
        setDocs(fallbackDocsData);
      }
    };

    fetchDocs();
  }, []);

  return docs;
}