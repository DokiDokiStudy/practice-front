import TopNav from '../../components/common/TopNav';
import ThreadCard from '../../components/dockerDocs/ThreadCard';
import NestedSidebar from '../../components/common/NestedSidebar';
import { docsData } from '../../data/docsData';

const dummyThreads = [
  {
    threadId: 'thread-1',
    title: '도커 설치할 때 주의할 점',
    summary: '도커 설치 중 문제가 생길 수 있는 몇 가지 환경이 있습니다... 전체 본문 예시...',
    likes: 5,
    dislikes: 0,
    comments: ['정말 도움됐어요', '윈도우 환경에서는 다른가요?'],
  },
  {
    threadId: 'thread-2',
    title: '컨테이너와 가상머신의 차이',
    summary: '컨테이너와 VM의 가장 큰 차이는 리소스 사용 방식입니다... 전체 본문 예시...',
    likes: 3,
    dislikes: 1,
    comments: ['깔끔한 설명입니다', 'PDF로 저장할 수 있나요?'],
  },
];

const ThreadList = () => {
  return (
    <>
      <TopNav />
      <NestedSidebar data={docsData} />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">🧵 전체 쓰레드 목록</h1>
        <div className="space-y-6">
          {dummyThreads.map((thread) => (
            <ThreadCard key={thread.threadId} {...thread} />
          ))}
        </div>
      </main>
    </>
  );
};

export default ThreadList;
