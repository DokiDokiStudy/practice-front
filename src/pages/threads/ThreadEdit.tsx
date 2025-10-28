import { useState, useEffect } from "react";
import { NestedSidebar } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { fetchCategories } from "@/entities/category";
import { useThread, useUpdateThread } from "@/features/thread/model/useThreads";
import { useAuth } from "@/features/auth";
import { docsData } from "@/features/docker-docs";

const ThreadEdit = () => {
  const { id } = useParams({ from: "/thread/$id/edit" });
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const threadId = parseInt(id || "0");

  // 기존 쓰레드 데이터 가져오기
  const {
    data: thread,
    isLoading: threadLoading,
    error: threadError,
  } = useThread(threadId);

  // 카테고리 데이터 가져오기
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    placeholderData: [],
  });

  // 쓰레드 수정 mutation
  const updateThreadMutation = useUpdateThread();

  // 쓰레드 데이터가 로드되면 폼에 설정
  useEffect(() => {
    if (thread) {
      setTitle(thread.title);
      setContent(thread.content);
      setSelectedCategory(thread.categoryId);
    }
  }, [thread]);

  // 카테고리를 평면 리스트로 변환
  const flattenCategories = (cats: any[]): any[] => {
    let result: any[] = [];
    cats.forEach((cat) => {
      result.push(cat);
      if (cat.children && cat.children.length > 0) {
        result = [...result, ...flattenCategories(cat.children)];
      }
    });
    return result;
  };

  const flatCategories = flattenCategories(categories);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (!selectedCategory) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    try {
      await updateThreadMutation.mutateAsync({
        id: threadId,
        data: {
          title: title.trim(),
          content: content.trim(),
          categoryId: selectedCategory,
        },
      });

      alert("쓰레드가 성공적으로 수정되었습니다!");
      navigate({ to: `/thread/${threadId}` });
    } catch (error) {
      console.error("쓰레드 수정 실패:", error);
      alert("쓰레드 수정 중 오류가 발생했습니다.");
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <NestedSidebar data={docsData} />
          <main className="max-w-4xl px-4 py-10 mx-auto w-full">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-red-600">
                로그인이 필요한 서비스입니다.
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (threadLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <NestedSidebar data={docsData} />
          <main className="max-w-4xl px-4 py-10 mx-auto w-full">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">
                쓰레드를 불러오고 있습니다...
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (threadError || !thread) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <NestedSidebar data={docsData} />
          <main className="max-w-4xl px-4 py-10 mx-auto w-full">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-red-600">
                쓰레드를 찾을 수 없습니다.
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <NestedSidebar data={docsData} />

        <main className="max-w-4xl px-4 py-10 mx-auto w-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate({ to: `/thread/${threadId}` })}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft size={16} />
                상세로
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                🧵 쓰레드 수정
              </h1>
            </div>
          </div>

          {/* 수정 폼 */}
          <form
            onSubmit={handleSubmit}
            className="rounded-lg shadow-lg p-8 bg-white border border-gray-200"
          >
            {/* 카테고리 선택 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                카테고리 *
              </label>
              <select
                value={selectedCategory || ""}
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">카테고리를 선택하세요</option>
                {flatCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 제목 입력 */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                제목 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="쓰레드 제목을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                maxLength={200}
              />
              <div className="text-sm mt-1 text-gray-500">
                {title.length}/200
              </div>
            </div>

            {/* 내용 입력 */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                내용 *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="쓰레드 내용을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={12}
                required
              />
              <div className="text-sm mt-1 text-gray-500">
                {content.length} 자
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate({ to: `/thread/${threadId}` })}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={updateThreadMutation.isPending}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={16} />
                {updateThreadMutation.isPending ? "수정 중..." : "수정하기"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ThreadEdit;
