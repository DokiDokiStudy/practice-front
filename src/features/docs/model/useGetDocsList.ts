import { useQuery, useQueries } from "@tanstack/react-query";
import { categoryKeys } from "@/entities/category";
import { postKeys } from "@/entities/post";
import type { DocsCategory, Chapter, Step } from "@/shared/types";

// TODO: 백엔드에서 정렬된 데이터를 반환하면 아래 정렬 로직 제거
function extractChapterNumber(name: string): number {
  const match = name.match(/^(\d+)장/);
  return match ? parseInt(match[1], 10) : Infinity;
}

// TODO: 백엔드에서 정렬된 데이터를 반환하면 아래 정렬 로직 제거
function extractStepNumber(title: string): number {
  const match = title.match(/^(\d+)\.(\d+)/);
  return match
    ? parseInt(match[1], 10) * 100 + parseInt(match[2], 10)
    : Infinity;
}

interface UseGetDocsListParams {
  categoryName: string;
}

export const useGetDocsList = ({
  categoryName,
}: UseGetDocsListParams): DocsCategory | null => {
  const { data: categories = [] } = useQuery(categoryKeys.list());

  const targetCategory = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase(),
  );
  const chapterCategories = targetCategory?.children || [];

  const chapterQueries = useQueries({
    queries: chapterCategories.map((chapter) => {
      const params = new URLSearchParams({ categoryId: String(chapter.id) });
      return {
        ...postKeys.list(params),
        enabled: chapterCategories.length > 0,
      };
    }),
  });

  if (!targetCategory) {
    return null;
  }

  // TODO: 백엔드에서 정렬된 데이터를 반환하면 아래 정렬 로직 제거
  const sortedChapterCategories = [...chapterCategories].sort(
    (a, b) => extractChapterNumber(a.name) - extractChapterNumber(b.name),
  );

  const chapterIndexMap = new Map(
    chapterCategories.map((chapter, index) => [chapter.id, index]),
  );

  const chapters: Chapter[] = sortedChapterCategories.map((chapter) => {
    const queryIndex = chapterIndexMap.get(chapter.id) ?? 0;
    const posts = chapterQueries[queryIndex]?.data?.posts || [];
    console.log(posts);

    // TODO: 백엔드에서 정렬된 데이터를 반환하면 아래 정렬 로직 제거
    const sortedPosts = [...posts].sort(
      (a, b) => extractStepNumber(a.title) - extractStepNumber(b.title),
    );

    const steps: Step[] = sortedPosts.map((post) => ({
      id: String(post.id),
      title: post.title,
      content: post.content,
    }));

    return {
      id: String(chapter.id),
      title: chapter.name,
      steps,
    };
  });

  return {
    id: categoryName.toLowerCase(),
    title: targetCategory.name,
    chapters,
  };
};
