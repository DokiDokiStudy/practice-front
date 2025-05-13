import { useNavigate, useLocation } from 'react-router-dom';

// 대분류 -> 중분류 -> 소분류 설계
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
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-60 p-4 border-r border-gray-300 bg-white">
      <h2 className="text-xl font-bold mb-4">📚 전체 프로젝트</h2>
      <ul className="space-y-2 text-sm">
        {data.map((project) => (
          <li key={project.id}>
            <div className="font-bold text-gray-800 mb-1">{project.title}</div>
            <ul className="ml-2 space-y-1">
              {project.chapters.map((chapter) => (
                <li key={chapter.id}>
                  <div className="text-gray-700 font-semibold">{chapter.title}</div>
                  <ul className="ml-4">
                    {chapter.steps?.map((step) => (
                      <li
                        key={step.id}
                        className={`cursor-pointer hover:underline ${
                          location.pathname.includes(step.id)
                            ? 'text-blue-600 font-semibold'
                            : ''
                        }`}
                        onClick={() => navigate(`/threads/${step.id}`)}
                      >
                        {step.title}
                      </li>
                    ))}
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
