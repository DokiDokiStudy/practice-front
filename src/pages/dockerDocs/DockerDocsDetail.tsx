import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopNav from '../../components/common/TopNav';
import SelectedStepThread from '../../components/dockerDocs/SelectedStepThread';
import { AnimatePresence } from 'framer-motion';
import NestedSidebar from '../../components/common/NestedSidebar';

// 임시 목차 데이터..
import { docsData } from '../../data/docsData';

const chapters = [
  {
    id: '1',
    title: '1장. 도커의 이해',
    steps: [
      { id: '1.1', title: '세팅 시작하기', content: '도커 설치 및 환경 설정에 대한 설명입니다.' },
      { id: '1.2', title: '컨테이너의 이해', content: '컨테이너는 가상 환경을 격리하여 실행하는 기술입니다.' },
      { id: '1.3', title: '컨테이너란?', content: '이미지로부터 실행된 인스턴스를 말합니다.' },
    ],
  },
  {
    id: '2',
    title: '2장. 도커 활용해보기',
    steps: [
      { id: '2.1', title: '도커 데스크톱의 역사', content: '도커 데스크톱은 GUI 환경에서 도커를 제어할 수 있게 해줍니다.' },
      { id: '2.2', title: '도커란?', content: '컨테이너 기반의 가상화 기술을 말합니다.' },
    ],
  },
];

export default function DockerDocsDetail() {
  const { chapterId = '1' } = useParams();
  const navigate = useNavigate();
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const currentIndex = chapters.findIndex((c) => c.id === chapterId);
  const chapter = chapters[currentIndex];

  const goToPrev = () => {
    if (currentIndex > 0) {
      navigate(`/docs/${chapters[currentIndex - 1].id}`);
    }
  };

  const goToNext = () => {
    if (currentIndex < chapters.length - 1) {
      navigate(`/docs/${chapters[currentIndex + 1].id}`);
    }
  };

  return (
    <>
      <TopNav />
      <div className="flex min-h-screen bg-white">
        <NestedSidebar data={docsData} />

        {/* 본문 영역 */}
        <main className="flex-1 relative px-6 py-10 max-w-4xl mx-auto">
          {/* 좌우 화살표 */}
          {currentIndex > 0 && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500 hover:text-black"
              onClick={goToPrev}
            >
              ⬅
            </button>
          )}
          {currentIndex < chapters.length - 1 && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500 hover:text-black"
              onClick={goToNext}
            >
              ➡
            </button>
          )}

          <h1 className="text-2xl font-bold mb-6">{chapter.title}</h1>

          {/* 스텝 나열 */}
          <div className="space-y-8">
            {chapter.steps.map((step) => (
              <section key={step.id} id={step.id}>
                <h2
                  className="text-lg font-semibold mb-2 cursor-pointer hover:underline"
                  onClick={() => setSelectedStepId(step.id)}
                >
                  {step.id}) {step.title}
                </h2>
                <p className="text-gray-800 leading-relaxed">{step.content}</p>
              </section>
            ))}
          </div>

          {/* 슬라이딩 스레드 창 */}
          <AnimatePresence>
          {selectedStepId && (
            <SelectedStepThread
                stepId={selectedStepId}
                onClose={() => setSelectedStepId(null)}
            />
            )}
        </AnimatePresence>
        </main>
      </div>
    </>
  );
}
