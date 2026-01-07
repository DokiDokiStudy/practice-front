import { useState, FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { Button, CategorySelect } from "@/shared/ui";
import { useCreatePost } from "@/features/boardForm";
import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/entities/category";
import MDEditor from "@uiw/react-md-editor";

export const BoardWriteForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const { mutate: create, isPending: isCreating } = useCreatePost();
  const { data: categories = [], isLoading: catLoading } = useQuery(
    categoryKeys.list()
  );

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

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2"
          required
        />
      </div>
      {/* TODO: 추후 md형식과 일반 형식 나누어서 처리하기
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
      /> */}

      <MDEditor
        value={content}
        onChange={(value) => setContent(value || "")}
        height="100%"
        data-color-mode="dark"
        style={{ marginTop: "1rem" }}
      />
      <div className="flex space-x-2 mt-4">
        <Button
          color="green"
          onClick={(event) => handleSubmit(event)}
          disabled={isCreating}
        >
          저장하기
        </Button>
        <Button color="gray" onClick={() => navigate({ to: "/board" })}>
          목록으로
        </Button>
      </div>
    </>
  );
};
