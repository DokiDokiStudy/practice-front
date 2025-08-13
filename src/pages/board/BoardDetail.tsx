import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useRef, useEffect, useState } from "react";
import BoardLayout from "@/components/layout/BoardLayout";
import BoardView from "@/components/board/BoardView";
import TopNav from "@/components/common/TopNav";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { usePost } from "@/hooks/usePosts";

function BoardDetail() {
  const { id } = useParams({ from: "/board/$id" });
  const navigate = useNavigate();
  const { data: post, isLoading, isError, error } = usePost(Number(id));

  if (isLoading)
    return (
      <BoardLayout>
        <p>로딩 중…</p>
      </BoardLayout>
    );
  if (isError)
    return (
      <BoardLayout>
        <p>에러 발생</p>
      </BoardLayout>
    );
  if (!post)
    return (
      <BoardLayout>
        <p>게시글을 찾을 수 없습니다.</p>
      </BoardLayout>
    );

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

  // const hasRunRef = useRef(false);

  // useEffect(() => {
  //   if (hasRunRef.current) return;
  //   hasRunRef.current = true;

  //   const found = dummyPosts.find((p) => String(p.id) == id);
  //   if (found) {
  //     setPost(found);
  //   } else {
  //     toast.error('게시글을 찾을 수 없습니다.');
  //     navigate('/board');
  //   }
  // }, [id, navigate]);

  // if (!post) return null; // 아직 로딩 중

  return (
    <>
      <BoardLayout>
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <p className="text-sm text-gray-500 mb-6">
          작성자: {post.author || post.user?.nickName || "익명"} · 조회수:{" "}
          {post.views || 0}
        </p>
        <div className="prose mb-8">{post.content}</div>

        <div className="flex space-x-2">
          <Link
            to={`/board/edit/${post.id}`}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            수정
          </Link>
          <Link to="/board" className="px-4 py-2 bg-gray-300 rounded">
            목록으로
          </Link>
        </div>
      </BoardLayout>
    </>
  );
}

export default BoardDetail;
