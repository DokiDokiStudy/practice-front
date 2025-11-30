import { useState, FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { CategorySelect } from "@/shared/ui";
import { useCreatePost, BoardForm } from "@/features/boardForm";
import { useCategories } from "@/features/category";

export const BoardWriteForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const { mutate: create, isPending: isCreating } = useCreatePost();
  const { data: categories = [], isLoading: catLoading } = useCategories();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    create(
      { categoryId, title, content },
      {
        onSuccess: () => {
          toast.success("게시글이 작성되었습니다!");
          navigate({ to: "/board" });
        },
        onError: (err) => toast.error(`작성 실패: ${err.message}`),
      }
    );
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">새 글 작성</h2>
      <div className="mb-4">
        <CategorySelect
          value={categoryId}
          onChange={setCategoryId}
          options={categories}
          isLoading={catLoading}
        />
      </div>

      <BoardForm
        titleValue={title}
        contentValue={content}
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onSubmit={handleSubmit}
        buttonText="작성 완료"
        buttonProps={{
          color: "green",
          size: "md",
          loading: isCreating,
          disabled: isCreating,
        }}
      />
    </>
  );
};
