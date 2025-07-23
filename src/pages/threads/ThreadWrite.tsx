import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardLayout from "../../components/layout/BoardLayout";
import BoardForm from "../../components/board/BoardForm";
import { toast } from "react-toastify";
import api from "@/lib/api";

type Category = {
  id: number;
  name: string;
  parentId: number | null;
};

// 더미 카테고리 데이터
const dummyCategories: Category[] = [
  { id: 1, name: "도커", parentId: null }, // 대분류
  { id: 2, name: "1장", parentId: 1 }, // 챕터
  { id: 3, name: "2장", parentId: 1 }, // 챕터
  { id: 4, name: "1.1", parentId: 2 }, // 소분류
  { id: 5, name: "1.2", parentId: 2 }, // 소분류
  { id: 4, name: "1.1", parentId: 3 }, // 소분류
  { id: 5, name: "1.2", parentId: 3 }, // 소분류
];

const ThreadWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainCategory, setMainCategory] = useState<number | null>(null);
  const [chapterCategory, setChapterCategory] = useState<number | null>(null);
  const [subCategory, setSubCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subCategory) {
      toast.warn("카테고리를 모두 선택해주세요.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/post", {
        categoryId: subCategory,
        title,
        content,
      });

      const { data, message } = res.data;

      if (res.status === 200) {
        toast.success(message || "게시글이 등록되었습니다!");
        navigate("/thread");
      } else {
        toast.warn(message || "서버 에러 발생.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "서버 에러 발생.");
    } finally {
      setLoading(false);
    }
  };

  const mainCategories = dummyCategories.filter((c) => c.parentId === null);
  const chapterCategories = dummyCategories.filter(
    (c) => c.parentId === mainCategory
  );
  const subCategories = dummyCategories.filter(
    (c) => c.parentId === chapterCategory
  );

  return (
    <>
      <BoardLayout>
        <h2 className="text-2xl font-bold text-center mb-6">스레드 작성</h2>

        <div className="space-y-4">
          <div className="flex space-x-4 mb-4">
            <select
              className="border p-2 rounded w-1/3"
              value={mainCategory ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setMainCategory(val === "" ? null : parseInt(val));
                setChapterCategory(null);
                setSubCategory(null);
              }}
            >
              <option value="" disabled hidden>
                📚 대분류 선택
              </option>
              {mainCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded w-1/3"
              value={chapterCategory ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setChapterCategory(val === "" ? null : parseInt(val));
                setSubCategory(null);
              }}
              disabled={!mainCategory}
            >
              <option value="" disabled hidden>
                📖 챕터 선택
              </option>
              {mainCategory &&
                chapterCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>

            <select
              className="border p-2 rounded w-1/3"
              value={subCategory ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setSubCategory(val === "" ? null : parseInt(val));
              }}
              disabled={!chapterCategory}
            >
              <option value="" disabled hidden>
                📄 소분류 선택
              </option>
              {chapterCategory &&
                subCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <BoardForm
            titleValue={title}
            contentValue={content}
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
            onSubmit={handleSubmit}
            buttonText="작성 완료"
            buttonProps={{ color: "green", size: "md", loading }}
          />
        </div>
      </BoardLayout>
    </>
  );
};

export default ThreadWrite;
