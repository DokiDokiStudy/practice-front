import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { NestedSidebar } from "@/shared/ui";
import { ArrowLeft, Save } from "lucide-react";
import { useTheme } from "@/app/providers";
import { docsData, useAuth, useDockerCategories } from "@/features";
import { useCreateThread } from "@/features/thread/model/useThreads";

const ThreadWrite = () => {
  const navigate = useNavigate();
  const { classes } = useTheme();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // 소분류 (최종 선택)
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null); // 중분류 (챕터)

  const {
    dockerCategory,
    flatDockerCategories,
    isLoading: categoriesLoading,
  } = useDockerCategories();

  const createThreadMutation = useCreateThread();

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
      alert(
        "소분류 카테고리를 선택해주세요. (대분류와 중분류를 먼저 선택한 후 소분류를 선택하세요)"
      );
      return;
    }

    try {
      await createThreadMutation.mutateAsync({
        title: title.trim(),
        content: content.trim(),
        categoryId: selectedCategory,
      });

      alert("쓰레드가 성공적으로 작성되었습니다!");
      navigate({ to: "/threads" });
    } catch (error) {
      console.error("쓰레드 작성 실패:", error);
      alert("쓰레드 작성 중 오류가 발생했습니다.");
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

  if (categoriesLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <NestedSidebar data={docsData} />
          <main className="max-w-4xl px-4 py-10 mx-auto w-full">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">
                카테고리를 불러오고 있습니다...
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate({ to: "/threads" })}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft size={16} />
                목록으로
              </button>
              <h1
                className={`text-2xl font-bold ${classes.title}`}
                style={classes.titleStyle}
              >
                🐳 Docker 학습 쓰레드 작성
              </h1>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`rounded-lg shadow-lg p-8 ${classes.surface}`}
            style={classes.surfaceBorderStyle}
          >
            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-4 ${classes.label}`}
                style={classes.labelStyle}
              >
                카테고리 선택 *{" "}
                <span className="text-xs text-gray-500">
                  (소분류까지 반드시 선택해주세요)
                </span>
              </label>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  📚 대분류
                </h4>
                <div className="p-3 bg-blue-50 rounded-lg border">
                  <span className="text-blue-700 font-medium">🐳 Docker</span>
                  <span className="text-xs text-gray-600 ml-2">
                    (학습 쓰레드 전용 카테고리)
                  </span>
                </div>
              </div>

              {dockerCategory?.children &&
                dockerCategory.children.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      📖 챕터별 주제
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dockerCategory.children.map((chapter) => (
                        <button
                          key={chapter.id}
                          type="button"
                          onClick={() => {
                            setSelectedChapter(chapter.id);
                            setSelectedCategory(null);
                          }}
                          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedChapter === chapter.id
                              ? "bg-green-600 text-white shadow-md"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {chapter.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {selectedChapter && dockerCategory?.children && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-red-600 mb-2">
                    📝 세부 내용 (필수 선택)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dockerCategory.children
                      .find((chapter) => chapter.id === selectedChapter)
                      ?.children?.map((subTopic) => (
                        <button
                          key={subTopic.id}
                          type="button"
                          onClick={() => setSelectedCategory(subTopic.id)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedCategory === subTopic.id
                              ? "bg-purple-600 text-white shadow-md"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {subTopic.name}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* 현재 선택 상태 표시 */}
              {(selectedChapter || selectedCategory) && (
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">
                      📍 현재 선택:
                    </span>
                    <span className="text-blue-600 ml-2">Docker</span>
                    {selectedChapter && (
                      <span className="text-green-600">
                        {" > "}
                        {
                          dockerCategory?.children?.find(
                            (ch) => ch.id === selectedChapter
                          )?.name
                        }
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="text-purple-600 font-medium">
                        {" > "}
                        {
                          flatDockerCategories.find(
                            (cat) => cat.id === selectedCategory
                          )?.name
                        }
                      </span>
                    )}
                  </div>
                  {!selectedCategory && (
                    <div className="text-xs text-red-600 mt-1">
                      ⚠️ 소분류까지 선택해야 글 작성이 가능합니다.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-2 ${classes.label}`}
                style={classes.labelStyle}
              >
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
              <div
                className={`text-sm mt-1 ${classes.textSecondary}`}
                style={classes.textSecondaryStyle}
              >
                {title.length}/200
              </div>
            </div>

            <div className="mb-8">
              <label
                className={`block text-sm font-medium mb-2 ${classes.label}`}
                style={classes.labelStyle}
              >
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
              <div
                className={`text-sm mt-1 ${classes.textSecondary}`}
                style={classes.textSecondaryStyle}
              >
                {content.length} 자
              </div>
            </div>

            {/* 나중에 Button 컴포넌트 가져다가 쓰기 */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate({ to: "/threads" })}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={createThreadMutation.isPending}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={16} />
                {createThreadMutation.isPending ? "작성 중..." : "작성하기"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ThreadWrite;
