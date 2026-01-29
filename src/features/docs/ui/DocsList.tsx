import { useNavigate } from "@tanstack/react-router";
import type { DocsCategory, Step } from "@/shared/types";
import { Category } from "@/entities/category";

export const DocsList = ({ docs }: { docs: Step[] }) => {
  const navigate = useNavigate();

  const goToDetail = (category: string, chapterId: number) => {
    navigate({
      to: "/docs/$category/$chapterId",
      params: { category, chapterId },
    });
  };

  return (
    <>
      {docs?.length ? (
        docs.map((section) => (
          <div key={section.id} className="mb-12">
            <h3
              className="text-xl font-semibold mb-2"
              onClick={() => goToDetail(section.id, 1)}
            >
              {section.title}
            </h3>

            {/* {section.chapters.map((chapter) => (
            <div key={chapter.id} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{chapter.title}</h3>
              <ul className="space-y-1 ml-4">
                {chapter.steps.map((step) => (
                  <li
                    key={step.id}
                    className="text-sm text-blue-700 hover:underline cursor-pointer"
                    onClick={() => goToDetail(section.id, step.id)}
                  >
                    {step.title}
                  </li>
                ))}
              </ul>
            </div>
          ))} */}
          </div>
        ))
      ) : (
        <>존재하는 챕터가 없습니다.</>
      )}
    </>
  );
};
