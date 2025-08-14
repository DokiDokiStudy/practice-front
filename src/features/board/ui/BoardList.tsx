import { Link } from "@tanstack/react-router";
import Button from "@/components/common/Button";
import { useBoardList } from "../model";
import type { BoardPost } from "../model";

interface BoardListProps {
  page?: number;
  onPageChange?: (page: number) => void;
}

export function BoardList({ page = 1, onPageChange }: BoardListProps) {
  const { posts, totalPages, isLoading, isError, error, utils } = useBoardList(
    page,
    10
  );

  if (isLoading) {
    return <div className="text-center py-20">로딩 중…</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        에러 발생: {error?.message || "알 수 없는 오류가 발생했습니다."}
      </div>
    );
  }

  return (
    <>
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
            posts.map((post: BoardPost) => (
              <tr
                key={post.id}
                className="border-b border-gray-200 hover:bg-white/70"
              >
                <td className="py-3 text-center">{post.id}</td>
                <td className="py-3 text-center">
                  <Link
                    to={`/board/${post.id}`}
                    className="text-black-700 hover:underline"
                    title={post.title}
                  >
                    {utils.truncateTitle(post.title)}
                  </Link>
                </td>
                <td className="py-3 text-center">
                  {post.author || post.user?.nickName || "익명"}
                </td>
                <td className="py-3 text-center">
                  {utils.getRelativeTime(post.createdAt)}
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
          onClick={() => onPageChange?.(Math.max(page - 1, 1))}
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
          onClick={() => onPageChange?.(Math.min(page + 1, totalPages))}
        >
          다음 ▶
        </Button>
      </div>
    </>
  );
}
