import { useNavigate, Link } from "@tanstack/react-router";
import { ErrorMessage, LoadingMsg, Button } from "@/shared/ui";
import { PostDetail } from "@/entities/post";
import { useBoard } from "../model";

interface BoardDetailContentProps {
  postId: number;
}

export const BoardDetailContent = ({ postId }: BoardDetailContentProps) => {
  const navigate = useNavigate();
  const { data: post, isLoading, isError, error } = useBoard(postId);

  if (isLoading) {
    return <LoadingMsg />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }

  if (!post) {
    return <ErrorMessage message="게시글을 찾을 수 없습니다." />;
  }

  const { id, title, author, createdAt, content } = post.data;

  return (
    <>
      <PostDetail
        title={title}
        author={author || "익명"}
        date={new Date(createdAt).toLocaleDateString("ko-KR")}
        content={content}
      />

      <div className="flex space-x-2 mt-6">
        <Link
          to="/board/$id/edit"
          params={{ id }}
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
