import { motion } from 'framer-motion';
import { X } from "lucide-react";
import ThreadCard from './ThreadCard';

const dummyThreads = [
  {
    threadId: 'thread-1',
    title: '도커 설치할 때 주의할 점',
    summary: '도커 설치 중 문제가 생길 수 있는 몇 가지 환경이 있습니다...',
    likes: 5,
    dislikes: 0,
    comments: ['정말 도움됐어요', '윈도우 환경에서는 다른가요?'],
  },
  {
    threadId: 'thread-2',
    title: '컨테이너와 가상머신의 차이',
    summary: '컨테이너와 VM의 가장 큰 차이는 리소스 사용 방식입니다...',
    likes: 3,
    dislikes: 1,
    comments: ['깔끔한 설명입니다', 'PDF로 저장할 수 있나요?'],
  },
];

interface Props {
  stepId: string;
  onClose: () => void;
}

const SelectedStepThread = ({ stepId, onClose }: Props) => {
    return (
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-[400px] bg-white border-l shadow-lg z-50 p-6 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">🧵 {stepId} 토론</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">
            <X />
          </button>
        </div>
  
        <div className="mb-4 text-sm text-gray-600">이 스텝에 대한 게시글입니다.</div>
  
        {dummyThreads.map((t) => (
          <ThreadCard key={t.threadId} {...t} />
        ))}
      </motion.div>
    );
  };

export default SelectedStepThread;
