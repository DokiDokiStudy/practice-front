import type { Category } from "@/entities/category";
import type { DocsCategory, Chapter, Step } from "@/shared/types";

export function transformCategoriesToDocs(
  categories: Category[]
): DocsCategory[] {
  const dockerCategory = categories.find((cat) => cat.name === "Docker");

  if (!dockerCategory || !dockerCategory.children) {
    return [];
  }

  const chapters: Chapter[] = dockerCategory.children.map((chapterCat) => {
    const steps: Step[] = (chapterCat.children || []).map((stepCat) => ({
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

  return [
    {
      id: "docker",
      title: dockerCategory.name,
      chapters,
    },
  ];
}
