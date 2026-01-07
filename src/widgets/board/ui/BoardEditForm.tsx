import { FormEvent, MouseEventHandler, useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { Button, LoadingMsg } from "@/shared/ui";
import MDEditor from "@uiw/react-md-editor";
import { BoardForm, useUpdatePost } from "@/features/boardForm";
import { useBoard } from "../model";

interface BoardEditFormProps {
  postId: number;
}

export const BoardEditForm = ({ postId }: BoardEditFormProps) => {
  const navigate = useNavigate();

  const { data: post, isLoading: postLoading, isError } = useBoard(postId);
  const { mutate: update, isPending: isUpdating } = useUpdatePost();
  const [content, setContent] = useState(post?.content || "");

  // useEffect(() => {
  //   if (authLoading || postLoading) return;

  //   if (isError || !post) {
  //     toast.error("게시글을 불러올 수 없습니다.");
  //     navigate({ to: "/board" });
  //     return;
  //   }

  //   if (post.data.author !== user?.nickName) {
  //     toast.warn("수정 권한이 없습니다.");
  //     navigate({ to: `/board/${postId}` });
  //     return;
  //   }

  //   setTitle(post.data.title);
  //   setContent(post.data.content);
  // }, [authLoading, postLoading, user, post, isError, navigate, postId]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    update(
      { id: postId, payload: { title: post?.title || "", content } },
      {
        onSuccess: () => {
          toast.success("게시글이 수정되었습니다!");
          navigate({ to: `/board/${postId}` });
        },
        onError: (err: Error) => {
          toast.error(`수정 실패: ${err.message}`);
        },
      }
    );
  };

  useEffect(() => {
    if (post?.content) {
      setContent(post.content);
    }
  }, [post?.content]);

  if (postLoading) {
    return <LoadingMsg />;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">✏️ 게시글 수정</h2>
      <div>
        <span className="text-gray-500">제목</span>
        <h3 className="text-xl font-semibold mt-1">{post?.title || ""}</h3>
      </div>

      <div className="flex justify-end text-sm text-gray-600 border-b pb-2">
        <span className="mr-2">작성자: {post?.author}</span>
        <span>
          {post?.createdAt
            ? new Date(post.createdAt).toLocaleDateString("ko")
            : ""}
        </span>
      </div>

      <div className="bg-[#fffde7] p-6 rounded-xl text-gray-800 flex-1 min-h-0 overflow-y-auto">
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || "")}
          height="100%"
          data-color-mode="dark"
        />
      </div>

      <div className="flex space-x-2 mt-4">
        <Link
          to={`/board/${postId}`}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          뒤로가기
        </Link>
        <Button
          color="green"
          onClick={(event) => handleSubmit(event)}
          disabled={isUpdating}
        >
          저장하기
        </Button>
        <Button color="gray" onClick={() => navigate({ to: "/board" })}>
          목록으로
        </Button>
      </div>
      {/* 
      TODO: 추후 md형식과 일반 형식 나누어서 처리하기
      <BoardForm
        contentValue={content}
        onContentChange={(e) => setContent(e.target.value)}
        onSubmit={handleSubmit}
        buttonText="수정 완료"
        buttonProps={{
          color: "green",
          size: "md",
          loading: isUpdating,
          disabled: isUpdating,
        }}
      /> 
      */}
    </>
  );
};
