import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useBoardDetail, useBoardDelete } from "../model";
import { BoardLayout } from "./BoardLayout";
import { BoardView } from "./BoardView";
import Button from "@/components/common/Button";

export function BoardDetailPage() {
  const { id } = useParams({ from: "/board/$id" });
  const navigate = useNavigate();
  const {
    data: post,
    isLoading,
    isError,
    error,
    utils,
  } = useBoardDetail(Number(id));
  const { mutate: deletePost, isPending: isDeleting } = useBoardDelete();

  const handleDelete = () => {
    if (!post) return;

    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      deletePost(post.id, {
        onSuccess: () => {
          toast.success("게시글이 삭제되었습니다.");
          navigate({ to: "/board" });
        },
        onError: (error) => {
          toast.error(`삭제 실패: ${error.message}`);
        },
      });
    }
  };

  const handleEdit = () => {
    if (!post) return;
    navigate({ to: `/board/edit/${post.id}` });
  };

  if (isLoading) {
    return (
      <BoardLayout>
        <div className="text-center py-20">로딩 중…</div>
      </BoardLayout>
    );
  }

  if (isError) {
    return (
      <BoardLayout>
        <div className="text-center py-20 text-red-500">
          에러 발생: {error?.message || "알 수 없는 오류가 발생했습니다."}
        </div>
      </BoardLayout>
    );
  }

  if (!post) {
    return (
      <BoardLayout>
        <div className="text-center py-20 text-gray-500">
          게시글을 찾을 수 없습니다.
        </div>
      </BoardLayout>
    );
  }

  return (
    <BoardLayout>
      <BoardView
        post={post}
        showActions={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="flex justify-between items-center mt-8 pt-4 border-t">
        <Link to="/board">
          <Button color="gray" size="md">
            ← 목록으로
          </Button>
        </Link>

        <div className="flex gap-2">
          <Link to={`/board/edit/${post.id}`}>
            <Button color="blue" size="md">
              수정
            </Button>
          </Link>
          <Button
            color="red"
            size="md"
            onClick={handleDelete}
            loading={isDeleting}
            disabled={isDeleting}
          >
            삭제
          </Button>
        </div>
      </div>
    </BoardLayout>
  );
}
