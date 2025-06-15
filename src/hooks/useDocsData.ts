import { useEffect, useState } from 'react';
import api from '@/lib/api';
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
        const res = await api.get('/category');
        const categories = res.data;

        if (!Array.isArray(categories) || categories.length === 0) {
          console.warn('📭 fallbackDocsData 사용');
          setDocs(fallbackDocsData);
          return;
        }

        const groupMap: { [groupId: string]: DocsSection } = {};
        categories.forEach((cat) => {
          const groupId = cat.groupId || 'etc';
          if (!groupMap[groupId]) {
            groupMap[groupId] = { id: groupId, title: groupId, chapters: [] };
          }
          if (cat.parentId === null) {
            groupMap[groupId].chapters.push({ id: cat.id, title: cat.name, steps: [] });
          }
        });

        categories
          .filter((c) => c.parentId !== null)
          .forEach((cat) => {
            for (const section of Object.values(groupMap)) {
              const chapter = section.chapters.find((ch) => ch.id === cat.parentId);
              if (chapter) {
                chapter.steps.push({ id: cat.id, title: cat.name });
              }
            }
          });

        setDocs(Object.values(groupMap));
      } catch (err) {
        console.error('문서 데이터 로드 실패, fallback 사용:', err);
        setDocs(fallbackDocsData); // 다시 보장
      }
    };

    fetchDocs();
  }, []);

  return docs;
}