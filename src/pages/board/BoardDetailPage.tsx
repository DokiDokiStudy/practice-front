import { usePost } from "@/features/board";
import { ErrorMessage, LoadingMsg, Button } from "@/shared/ui";
import { useParams, useNavigate, Link } from "@tanstack/react-router";
import { BoardView } from "@/features/board/ui";
import { BoardLayout } from "@/widgets/_common";

export function BoardDetailPage() {
  const { id } = useParams({ from: "/board/$id" });
  const navigate = useNavigate();
  const { data: post, isLoading, isError, error } = usePost(Number(id));

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

  if (!post) {
    return (
      <BoardLayout>
        <ErrorMessage message="게시글을 찾을 수 없습니다." />
      </BoardLayout>
    );
  }

  return (
    <BoardLayout>
      <BoardView
        title={post.title}
        author={post.author || post.user?.nickName || "익명"}
        date={new Date(post.createdAt).toLocaleDateString("ko-KR")}
        content={post.content}
      />

      <div className="flex space-x-2 mt-6">
        <Link
          to="/board/$id/edit"
          params={{ id: post.id }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          수정
        </Link>
        <Button color="gray" onClick={() => navigate({ to: "/board" })}>
          목록으로
        </Button>
      </div>
    </BoardLayout>
  );
}
