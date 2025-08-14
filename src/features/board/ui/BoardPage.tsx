import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/common/Button";
import { BoardLayout } from "./BoardLayout";
import { BoardList } from "./BoardList";

export function BoardPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { user, isLoading: authLoading } = useAuth();

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
            onClick={() => navigate({ to: "/login" })}
          >
            로그인 후 쓰기 가능
          </Button>
        )}
      </div>

      <BoardList page={page} onPageChange={setPage} />
    </BoardLayout>
  );
}
