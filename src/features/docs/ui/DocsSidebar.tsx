import { useNavigate, useParams } from "@tanstack/react-router";
import type { DocsCategory } from "@/shared/types";

interface DocsSidebarProps {
  docs: DocsCategory;
}

export const DocsSidebar = ({ docs }: DocsSidebarProps) => {
  const navigate = useNavigate();
  const { postId } = useParams({ from: "/docs/$category/$postId" });

  const goToDetail = (targetPostId: string) => {
    navigate({
      to: "/docs/$category/$postId",
      params: { category: docs.id, postId: targetPostId },
    });
  };

  return (
    <aside className="w-64 p-4 border-r border-gray-300 bg-white overflow-y-auto shrink-0">
      <h2 className="text-xl font-bold mb-4">📚 목차</h2>
      {docs.chapters.map((chapter) => (
        <div key={chapter.id} className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            {chapter.title}
          </h3>
          <ul className="space-y-1 ml-2">
            {chapter.steps.map((step) => {
              const isActive = postId === step.id;

              return (
                <li
                  key={step.id}
                  className={`text-xs cursor-pointer hover:underline ${
                    isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                  }`}
                  onClick={() => goToDetail(step.id)}
                >
                  {step.title}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
};
