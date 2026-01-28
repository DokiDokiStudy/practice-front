import { useNavigate } from "@tanstack/react-router";
import type { DocsCategory } from "@/shared/types";

interface DocsListProps {
  docs: DocsCategory;
}

export const DocsList = ({ docs }: DocsListProps) => {
  const navigate = useNavigate();

  const goToDetail = (postId: string) => {
    navigate({
      to: "/docs/$category/$postId",
      params: { category: docs.id, postId },
    });
  };

  return (
    <>
      {docs.chapters.map((chapter) => (
        <div key={chapter.id} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{chapter.title}</h3>
          <ul className="space-y-1 ml-4">
            {chapter.steps.map((step) => (
              <li
                key={step.id}
                className="text-sm text-blue-700 hover:underline cursor-pointer"
                onClick={() => goToDetail(step.id)}
              >
                {step.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
