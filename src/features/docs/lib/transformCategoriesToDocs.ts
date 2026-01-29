import type { Category } from "@/entities/category";
import type { DocsCategory, Chapter, Step } from "@/shared/types";
// import { DocsCategoryNew } from "@/shared/types/docs";

export function extractChapterNumber(name: string): number {
  const match = name.match(/^(\d+)장/);
  return match ? parseInt(match[1], 10) : Infinity;
}

//TODO: 현재 docker 맞춤, 추후 범용적으로 변경 필요
export const transformCategoriesToDocs = (
  categories: Category[]
): Chapter[] => {
  // const dockerCategory = categories.find((cat) => cat.name === "Docker");

  // if (!dockerCategory || !dockerCategory.children) {
  //   return [];
  // }

  // const sortedChildren = [...categories].sort((a, b) => {
  //   const numA = extractChapterNumber(a.name);
  //   const numB = extractChapterNumber(b.name);
  //   return numA - numB;
  // });

  const chapters: Chapter[] = categories.map((chapterCat) => {
    const sortedSteps = [...(chapterCat.children || [])].sort((a, b) => {
      const numA = extractChapterNumber(a.name);
      const numB = extractChapterNumber(b.name);
      return numA - numB;
    });

    const steps: Step[] = sortedSteps.map((stepCat) => ({
      id: String(stepCat.id),
      title: stepCat.name,
      content: "",
    }));

    return {
      id: String(chapterCat.id),
      title: chapterCat.name,
      steps,
    };
  });

  return chapters;

  // return [
  //   {
  //     id: "docker",
  //     title: dockerCategory.name,
  //     chapters,
  //   },
  // ];
};
