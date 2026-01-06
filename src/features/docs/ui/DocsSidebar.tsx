import { useNavigate, useParams } from "@tanstack/react-router";
import type { DocsCategory } from "@/shared/types";

interface DocsSidebarProps {
  docs: DocsCategory[];
}

export const DocsSidebar = ({ docs }: DocsSidebarProps) => {
  const navigate = useNavigate();
  const { chapterId } = useParams({ from: "/docs/$category/$chapterId" });

  const goToDetail = (category: string, stepId: string) => {
    navigate({
      to: "/docs/$category/$chapterId",
      params: { category, chapterId: stepId },
    });
  };

  return (
    <aside className="w-64 p-4 border-r border-gray-300 bg-white overflow-y-auto shrink-0">
      <h2 className="text-xl font-bold mb-4">📚 목차</h2>
      {docs.map((section) => (
        <div key={section.id} className="mb-6">
          {section.chapters.map((chapter) => (
            <div key={chapter.id} className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                {chapter.title}
              </h3>
              <ul className="space-y-1 ml-2">
                {chapter.steps.map((step) => {
                  const isActive = chapterId === step.id;

                  return (
                    <li
                      key={step.id}
                      className={`text-xs cursor-pointer hover:underline ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700"
                      }`}
                      onClick={() => goToDetail(section.id, step.id)}
                    >
                      {step.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
};
