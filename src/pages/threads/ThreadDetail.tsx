import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import TopNav from '../../components/common/TopNav';
import BoardLayout from '../../components/layout/BoardLayout';
import BoardView from '../../components/board/BoardView';
import Button from '../../components/common/Button';

const dummyThreads = [
  {
    id: 'thread-1',
    title: '도커 설치할 때 주의할 점',
    content:
      '도커 설치 중 문제가 생길 수 있는 몇 가지 환경이 있습니다. 특히 Windows 환경에서는 WSL2 설정이 중요하며, Mac에서는 Apple Silicon과의 호환성 문제를 확인해야 합니다.',
    author: '익명1',
    date: '2025-05-14',
  },
  {
    id: 'thread-2',
    title: '컨테이너와 가상머신의 차이',
    content:
      '컨테이너와 VM의 가장 큰 차이는 리소스 사용 방식입니다. VM은 하이퍼바이저를 거쳐 OS 단위로 분리되며, 컨테이너는 커널을 공유하면서 애플리케이션 단위로 분리됩니다.',
    author: '익명2',
    date: '2025-05-13',
  },
];

const ThreadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState<typeof dummyThreads[0] | null>(null);

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const found = dummyThreads.find((t) => t.id === id);
    if (found) {
      setThread(found);
    } else {
      alert('해당 게시글을 찾을 수 없습니다.');
      navigate('/thread');
    }
  }, [id, navigate]);

  if (!thread) return null;

  return (
    <>
      <TopNav />
      <BoardLayout>
        <h2 className="text-2xl font-bold text-center mb-6">🧵 쓰레드 상세</h2>
        <BoardView
          title={thread.title}
          author={thread.author}
          date={thread.date}
          content={thread.content}
        />
        <div className="mt-6 text-center">
          <Button onClick={() => navigate('/thread')} color="gray">
            목록으로
          </Button>
        </div>
      </BoardLayout>
    </>
  );
};

export default ThreadDetail;