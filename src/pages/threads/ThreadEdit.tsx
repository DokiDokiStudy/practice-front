import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardLayout from "../../components/layout/BoardLayout";
import BoardForm from "../../components/board/BoardForm";
import { toast } from "react-toastify";

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

const ThreadEdit = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const found = dummyThreads.find((t) => t.id === threadId);
    if (!found) {
      toast.error("수정할 게시글을 찾을 수 없습니다.");
      return navigate("/thread");
    }

    setTitle(found.title);
    setContent(found.content);
  }, [threadId, navigate]);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("수정된 스레드:", { threadId, title, content });
    toast.success("수정이 완료되었습니다.");
    navigate("/thread");
  };

  return (
    <>
      <BoardLayout>
        <h2 className="text-2xl font-bold text-center mb-6">✏️ 스레드 수정</h2>
        <BoardForm
          titleValue={title}
          contentValue={content}
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          onSubmit={handleUpdate}
          buttonText="수정 완료"
          buttonProps={{ color: "blue", size: "md", loading: false }}
        />
      </BoardLayout>
    </>
  );
};

export default ThreadEdit;
