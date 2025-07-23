import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreadCard from "@/components/dockerDocs/ThreadCard";
import NestedSidebar from "@/components/common/NestedSidebar";
import { docsData } from "@/data/docsData";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

type Thread = {
  threadId: string;
  title: string;
  summary?: string;
  likes: number;
  dislikes: number;
  comments: string[];
  categoryId?: number;
  categoryName?: string;
};

const dummyThreads: Thread[] = [
  {
    threadId: "thread-1",
    title: "도커 설치할 때 주의할 점",
    summary:
      "도커 설치 중 문제가 생길 수 있는 몇 가지 환경이 있습니다... 전체 본문 예시...",
    likes: 5,
    dislikes: 0,
    comments: ["정말 도움됐어요", "윈도우 환경에서는 다른가요?"],
  },
  {
    threadId: "thread-2",
    title: "컨테이너와 가상머신의 차이",
    summary:
      "컨테이너와 VM의 가장 큰 차이는 리소스 사용 방식입니다... 전체 본문 예시...",
    likes: 3,
    dislikes: 1,
    comments: ["깔끔한 설명입니다", "PDF로 저장할 수 있나요?"],
  },
];

const ThreadList = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const initialized = useRef(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const fetchThreads = async () => {
      try {
        const res = await api.get("/post");

        const data = res.data.posts.map((post: any) => ({
          threadId: post.id.toString(),
          title: post.title,
          summary: post.content.slice(0, 80) + "...",
          likes: post.likes ?? 0,
          dislikes: post.dislikes ?? 0,
          comments: post.comments ?? [],
          categoryId: post.category?.id,
          categoryName: post.category?.name,
        }));

        if (data.length == 0) {
          setThreads(dummyThreads);
        } else {
          setThreads(data);
        }
      } catch (err) {
        setThreads(dummyThreads);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <NestedSidebar data={docsData} />

        <main className="max-w-4xl px-4 py-10 mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">🧵 전체 쓰레드 목록</h1>
            {user && (
              <button
                onClick={() => navigate("/thread/write")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                글쓰기
              </button>
            )}
          </div>

          <div className="space-y-6">
            {threads.map((thread) => (
              <ThreadCard key={thread.threadId} {...thread} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ThreadList;
