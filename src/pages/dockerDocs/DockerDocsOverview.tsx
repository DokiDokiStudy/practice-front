import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/common/TopNav';

interface Chapter {
  id: string;
  title: string;
  steps: { id: string; title: string }[];
}

const chapters: Chapter[] = [
  {
    id: '1',
    title: '1장. 도커의 이해',
    steps: [
      { id: '1.1', title: '세팅 시작하기' },
      { id: '1.2', title: '컨테이너의 이해' },
      { id: '1.3', title: '컨테이너란?' },
    ],
  },
  {
    id: '2',
    title: '2장. 도커 활용해보기',
    steps: [
      { id: '2.1', title: '도커 데스크톱의 역사' },
      { id: '2.2', title: '도커란?' },
    ],
  },
];

export default function DockerDocsOverview() {
  const navigate = useNavigate();

  const goToDetail = (chapterId: string, stepId?: string) => {
    navigate(`/docs/${chapterId}${stepId ? `/${stepId}` : ''}`);
  };

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Docker Docs</h1>

          {chapters.map((chapter) => (
            <div key={chapter.id} className="mb-8">
              {/* 중제목 */}
              <h2
                className="text-xl font-semibold mt-8 mb-3 cursor-pointer hover:underline"
                onClick={() => goToDetail(chapter.id)}
              >
                {chapter.title}
              </h2>

              {/* 소제목 */}
              <ul className="space-y-1">
                {chapter.steps.map((step) => (
                  <li
                    key={step.id}
                    className="text-sm text-blue-700 hover:underline cursor-pointer block"
                    onClick={() => goToDetail(chapter.id, step.id)}
                  >
                    {step.id}) {step.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
