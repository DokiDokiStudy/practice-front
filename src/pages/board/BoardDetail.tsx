import { useRef, useEffect, useState } from "react";
import BoardLayout from "../../components/layout/BoardLayout";
import BoardView from "../../components/board/BoardView";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import { Link, useNavigate, useMatch } from "@tanstack/react-router";

function BoardDetail() {
  const { id } = useMatch({ from: "/board/$id" });
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  sessionStorage.setItem("isLoggedIn", "true");
  sessionStorage.setItem("userId", "관리자");

  const isLoggedIn = sessionStorage.getItem("isLoggedIn") == "true";
  const currentUser = sessionStorage.getItem("userId");

  // 더미 데이터 (실제론 API 요청)
  const dummyPosts = [
    {
      id: 1,
      title: "공지사항입니다",
      author: "관리자",
      date: "2025-04-17",
      content: "공지 내용입니다.",
    },
    {
      id: 2,
      title: "문의드립니다.",
      author: "사용자1",
      date: "2025-04-16",
      content: "문의 내용입니다.",
    },
    {
      id: 3,
      title: "이벤트 안내",
      author: "운영자",
      date: "2025-04-15",
      content: "이벤트 내용입니다.",
    },
  ];

  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const found = dummyPosts.find((p) => String(p.id) == id);
    if (found) {
      setPost(found);
    } else {
      toast.error("게시글을 찾을 수 없습니다.");
      navigate({ to: "/board" });
    }
  }, [id, navigate]);

  if (!post) return null; // 아직 로딩 중

  return (
    <>
      <BoardLayout className="max-w-7xl">
        <h2 className="text-2xl font-bold text-black-900 mb-6 text-center">
          📄 게시글 상세
        </h2>
        <BoardView
          title={post.title}
          author={post.author}
          date={post.date}
          content={post.content}
        />
      </BoardLayout>
      <div className="mt-6 flex gap-4 justify-center">
        <Link to="/board">
          <Button color="gray" size="md">
            목록으로
          </Button>
        </Link>
        {isLoggedIn && currentUser == post.author && (
          <Link to="/board/$id/edit" params={{ id: post.id }}>
            <Button color="teal" size="md">
              수정하기
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}

export default BoardDetail;
