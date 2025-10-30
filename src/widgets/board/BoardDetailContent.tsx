import { useNavigate, Link } from "@tanstack/react-router";
import { ErrorMessage, LoadingMsg, Button } from "@/shared/ui";
import { usePost, BoardView } from "@/features/board";

interface BoardDetailContentProps {
  postId: number;
}

export const BoardDetailContent = ({ postId }: BoardDetailContentProps) => {
  const navigate = useNavigate();
  const { data: post, isLoading, isError, error } = usePost(postId);

  if (isLoading) {
    return <LoadingMsg />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }

  if (!post) {
    return <ErrorMessage message="게시글을 찾을 수 없습니다." />;
  }

  return (
    <>
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
    </>
  );
};
