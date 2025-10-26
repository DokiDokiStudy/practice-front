import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button, ErrorMessage, LoadingMsg } from "@/shared/ui";
import { useAuth } from "@/features/auth";
import { usePosts } from "@/features/board";
import { BoardList, BoardPagination } from "@/features/board/ui";
import { BoardLayout } from "@/widgets/_common";

export function BoardPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { user, isLoading: authLoading } = useAuth();
  const { posts, totalPages, isLoading, isError, error } = usePosts(page, 10);

  if (isLoading) {
    return (
      <BoardLayout>
        <LoadingMsg />
      </BoardLayout>
    );
  }

  if (isError) {
    return (
      <BoardLayout>
        <ErrorMessage message={error?.message} />
      </BoardLayout>
    );
  }

  return (
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
            onClick={() => navigate({ to: "/auth", search: { mode: "login" } })}
          >
            로그인 후 쓰기 가능
          </Button>
        )}
      </div>

      <BoardList posts={posts} />
      <BoardPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </BoardLayout>
  );
}
