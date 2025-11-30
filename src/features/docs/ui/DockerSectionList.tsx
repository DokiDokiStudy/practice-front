import { useNavigate } from "@tanstack/react-router";
import type { DocsCategory } from "@/entities/docs-categories";

export function DocsSectionList({ docs }: { docs: DocsCategory[] }) {
  const navigate = useNavigate();

  const goToDetail = (category: string, chapterId: string, stepId?: string) => {
    navigate({
      to: "/docs/$category/$chapterId",
      params: { category, chapterId },
      hash: stepId,
    });
  };

  return (
    <>
      {docs.map((section) => (
        <div key={section.id} className="mb-12">
          {section.chapters.map((chapter) => (
            <div key={chapter.id} className="mb-6">
              <h3
                className="text-xl font-semibold mb-2 cursor-pointer hover:underline"
                onClick={() => goToDetail(section.id, chapter.id)}
              >
                {chapter.title}
              </h3>
              <ul className="space-y-1 ml-4">
                {chapter.steps.map((step) => (
                  <li
                    key={step.id}
                    className="text-sm text-blue-700 hover:underline cursor-pointer"
                    onClick={() => goToDetail(section.id, chapter.id, step.id)}
                  >
                    {step.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
