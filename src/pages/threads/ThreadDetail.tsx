import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BoardLayout from "@/components/layout/BoardLayout";
import BoardView from "@/components/board/BoardView";
import Button from "@/components/common/Button";
import api from "@/lib/api";

const dummyThreads = [
  {
    id: "thread-1",
    title: "도커 설치할 때 주의할 점",
    content:
      "도커 설치 중 문제가 생길 수 있는 몇 가지 환경이 있습니다. 특히 Windows 환경에서는 WSL2 설정이 중요하며, Mac에서는 Apple Silicon과의 호환성 문제를 확인해야 합니다.",
    author: "익명1",
    date: "2025-05-14",
  },
  {
    id: "thread-2",
    title: "컨테이너와 가상머신의 차이",
    content:
      "컨테이너와 VM의 가장 큰 차이는 리소스 사용 방식입니다. VM은 하이퍼바이저를 거쳐 OS 단위로 분리되며, 컨테이너는 커널을 공유하면서 애플리케이션 단위로 분리됩니다.",
    author: "익명2",
    date: "2025-05-13",
  },
];

type ThreadType = (typeof dummyThreads)[0];

type CommentType = {
  id: string;
  content: string;
  author: string;
};

const ThreadDetail = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState<ThreadType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !threadId) return;
    initialized.current = true;

    const fetchThread = async () => {
      try {
        const res = await api.get(`/post/${threadId}`);
        const post = res.data;
        setThread({
          id: post.id.toString(),
          title: post.title,
          content: post.content,
          author: post.author ?? "익명",
          date: post.createdAt?.slice(0, 10) ?? "날짜 없음",
        });
      } catch (err) {
        const found = dummyThreads.find((t) => t.id === threadId);
        if (found) {
          setThread(found);
        } else {
          alert("해당 게시글을 찾을 수 없습니다.");
          navigate("/thread");
        }
      }
    };

    const fetchComments = async () => {
      try {
        const res = await api.get(`/comment?postId=${threadId}`);
        setComments(res.data);
      } catch (err) {
        console.warn("댓글 불러오기 실패:", err);
      }
    };

    fetchThread();
    fetchComments();
  }, [threadId, navigate]);

  // comment가 없어..
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await api.post("/comment", {
        content: newComment,
        postId: threadId,
        author: "익명",
      });
      setNewComment("");
      const res = await api.get(`/comment?postId=${threadId}`);
      setComments(res.data);
    } catch (err) {
      console.error("댓글 등록 실패:", err);
    }
  };

  if (!thread) return null;

  return (
    <>
      <BoardLayout>
        <h2 className="text-2xl font-bold text-center mb-6">🧵 쓰레드 상세</h2>
        <BoardView
          title={thread.title}
          author={thread.author}
          date={thread.date}
          content={thread.content}
        />

        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-2">💬 댓글</h3>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="w-full border px-3 py-2 rounded"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-blue-600 text-white px-4 py-1 mt-2 rounded hover:bg-blue-700"
          >
            등록
          </button>

          <ul className="space-y-3 mt-6">
            {comments.length === 0 ? (
              <li className="text-gray-500 text-sm">댓글이 없습니다.</li>
            ) : (
              comments.map((c) => (
                <li key={c.id} className="border p-3 rounded">
                  <div className="text-sm font-semibold text-gray-700">
                    {c.author}
                  </div>
                  <div className="text-sm text-gray-800 mt-1">{c.content}</div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={() => navigate("/thread")} color="gray">
            목록으로
          </Button>
        </div>
      </BoardLayout>
    </>
  );
};

export default ThreadDetail;
