import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import BoardLayout from "@/widgets/layout/ui/BoardLayout";
import BoardForm from "@/features/board/ui/BoardForm";
import { useAuth } from "@/features/auth/model/useAuth";
import { useCreatePost } from "@/features/board/model/useMutatePost";
import { useCategories } from "@/features/category/model/useCategories";

export default function BoardWrite() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const { mutate: create, isPending: isCreating } = useCreatePost();
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
      <BoardLayout>
        <h2 className="text-2xl font-bold text-center mb-6">새 글 작성</h2>

        {/* 카테고리가 필요할 거 같긴 한데 해당 게시판(게시글)은 추후 용도에 따라 달라질 예정.. 일단 연습용으로 카테고리 붙여봄 */}
        <div className="mb-4">
          {catLoading ? (
            <p>카테고리 로딩 중…</p>
          ) : (
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            >
              <option value={0}>카테고리 선택</option>
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
        />
      </BoardLayout>
    </>
  );
}
