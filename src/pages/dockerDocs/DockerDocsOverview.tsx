import { useNavigate } from "@tanstack/react-router";
import { useDocsData } from "@features/docker-docs/model/useDocsData";

export default function DockerDocsOverview() {
  const navigate = useNavigate();
  const docs = useDocsData();

  const goToDetail = (
    projectId: string,
    chapterId: string,
    stepId?: string
  ) => {
    navigate({
      to: "/docs/$projectId/$chapterId",
      params: { projectId, chapterId },
      hash: stepId ? stepId : undefined,
    });
  };

  return (
    <>
      <div className="flex-1 bg-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Docker Docs</h1>

          {docs.map((section) => (
            <div key={section.id} className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {section.title}
              </h2>
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
                        onClick={() =>
                          goToDetail(section.id, chapter.id, step.id)
                        }
                      >
                        {step.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
