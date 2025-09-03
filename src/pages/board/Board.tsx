import { useState } from "react";
import BoardLayout from "@/widgets/layout/ui/BoardLayout";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/shared/ui";
import { useAuth } from "@/features/auth";
import { usePosts } from "@/features/board";

export default function Board() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { user, isLoading: authLoading } = useAuth();
  const { posts, totalPages, total, isLoading, isError, error } = usePosts(
    page,
    10
  );

  // 로딩 상태 분기
  if (isLoading) {
    return (
      <BoardLayout>
        <p className="text-center py-20">로딩 중…</p>
      </BoardLayout>
    );
  }

  // 에러 상태 분기
  if (isError) {
    return (
      <BoardLayout>
        <p className="text-center py-20 text-red-500">
          에러 발생: {error?.message || "알 수 없는 오류가 발생했습니다."}
        </p>
      </BoardLayout>
    );
  }

  // 정상 데이터 렌더링
  return (
    <>
      <BoardLayout>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">📌 게시판</h2>
          {authLoading ? (
            <Button size="md" color="gray" disabled>
              …
            </Button>
          ) : user ? (
            <Link to="/board/write">
              <Button size="md" color="teal">
                글쓰기
              </Button>
            </Link>
          ) : (
            <Button
              size="md"
              color="gray"
              disabled
              onClick={() => navigate({ to: "/login" })}
            >
              로그인 후 쓰기 가능
            </Button>
          )}
        </div>
        <table className="w-full text-left table-fixed border-t border-gray-300 mb-4">
          <thead>
            <tr className="text-gray-600 border-b border-gray-300">
              <th className="w-1/12 py-2 text-center">번호</th>
              <th className="w-6/12 py-2 text-center">제목</th>
              <th className="w-2/12 py-2 text-center">작성자</th>
              <th className="w-3/12 py-2 text-center">작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-gray-200 hover:bg-white/70"
                >
                  <td className="py-3 text-center">{post.id}</td>
                  <td className="py-3 text-center">
                    <Link
                      to={`/board/${post.id}`}
                      className="text-black-700 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-3 text-center">
                    {post.author || post.user?.nickName || "익명"}
                  </td>
                  <td className="py-3 text-center">
                    {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-20 text-center text-gray-500">
                  등록된 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center gap-2 text-sm">
          <Button
            color="gray"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            ◀ 이전
          </Button>
          <span className="flex items-center px-2">
            {page} / {totalPages} 페이지
          </span>
          <Button
            color="gray"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            다음 ▶
          </Button>
        </div>
      </BoardLayout>
    </>
  );
}
