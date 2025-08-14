import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useCategories";
import { BoardLayout } from "./BoardLayout";
import { BoardForm } from "./BoardForm";
import { useBoardCreate } from "../model";

export function BoardWritePage() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const { mutate: create, isPending: isCreating } = useBoardCreate();
  const { data: categories = [], isLoading: catLoading } = useCategories();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      toast.warn("로그인 후 글쓰기가 가능합니다.");
      navigate({ to: "/login" });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);

    create(
      { categoryId, title, content },
      {
        onSuccess: () => {
          toast.success("게시글이 작성되었습니다!");
          navigate({ to: "/board" });
        },
        onError: (err) => {
          const errorMessage = err.message;
          if (errorMessage.includes("•")) {
            setErrors(
              errorMessage
                .split("•")
                .filter(Boolean)
                .map((e) => e.trim())
            );
          } else {
            toast.error(`작성 실패: ${errorMessage}`);
          }
        },
      }
    );
  };

  return (
    <BoardLayout>
      <h2 className="text-2xl font-bold text-center mb-6">새 글 작성</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          카테고리 <span className="text-red-500">*</span>
        </label>
        {catLoading ? (
          <p className="text-gray-500">카테고리 로딩 중…</p>
        ) : (
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value={0}>카테고리를 선택해주세요</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
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
          disabled: authLoading || isCreating,
        }}
        errors={errors}
      />
    </BoardLayout>
  );
}
