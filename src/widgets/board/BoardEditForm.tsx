import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { LoadingMsg } from "@/shared/ui";
import { BoardForm, usePost, useUpdatePost } from "@/features/board";

interface BoardEditFormProps {
  postId: number;
}

export const BoardEditForm = ({ postId }: BoardEditFormProps) => {
  const navigate = useNavigate();

  const { data: post, isLoading: postLoading, isError } = usePost(postId);
  const { mutate: update, isPending: isUpdating } = useUpdatePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   if (authLoading || postLoading) return;

  //   if (isError || !post) {
  //     toast.error("게시글을 불러올 수 없습니다.");
  //     navigate({ to: "/board" });
  //     return;
  //   }

  //   if (post.author !== user?.nickName) {
  //     toast.warn("수정 권한이 없습니다.");
  //     navigate({ to: `/board/${postId}` });
  //     return;
  //   }

  //   setTitle(post.title);
  //   setContent(post.content);
  // }, [authLoading, postLoading, user, post, isError, navigate, postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update(
      { id: postId, payload: { title, content } },
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

  if (postLoading) {
    return <LoadingMsg />;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">✏️ 게시글 수정</h2>
      <BoardForm
        titleValue={title}
        contentValue={content}
        onTitleChange={(e) => setTitle(e.target.value)}
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
    </>
  );
};
