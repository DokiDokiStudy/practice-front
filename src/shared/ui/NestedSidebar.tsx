import { useRouter, useRouterState } from "@tanstack/react-router";

interface Step {
  id: string;
  title: string;
}

interface Chapter {
  id: string;
  title: string;
  steps?: Step[];
}

interface Project {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface Props {
  data: Project[];
}

const NestedSidebar = ({ data }: Props) => {
  const router = useRouter();
  const state = useRouterState();

  return (
    <aside className="w-60 p-4 border-r border-gray-300 bg-white overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">📚 전체 프로젝트</h2>
      <ul className="space-y-2 text-sm">
        {data.map((project) => (
          <li key={project.id}>
            <div className="font-bold text-gray-800 mb-1">{project.title}</div>
            <ul className="ml-2 space-y-1">
              {project.chapters.map((chapter) => (
                <li key={chapter.id}>
                  <div className="text-gray-700 font-semibold">
                    {chapter.title}
                  </div>
                  <ul className="ml-4 space-y-0.5 mt-1">
                    {chapter.steps?.map((step) => {
                      const isActive = state.location.pathname.includes(
                        step.id
                      );

                      return (
                        <li
                          key={step.id}
                          className={`cursor-pointer hover:underline ${
                            isActive
                              ? "text-blue-600 font-semibold"
                              : "text-gray-700"
                          }`}
                          onClick={() =>
                            router.navigate({
                              to: "/docs/$projectId/$chapterId",
                              params: {
                                projectId: project.id,
                                chapterId: chapter.id,
                              },
                              hash: step.id,
                            })
                          }
                        >
                          {step.title}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NestedSidebar;
