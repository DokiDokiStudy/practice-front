import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/shared/lib/auth";
import { NestedSidebar } from "@/shared/ui";
import { docsData, useDockerCategories } from "@/features/docs";
import { ThreadCard } from "./ThreadCard";
import { useThreadList } from "../model";

export const ThreadList = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const {
    dockerCategory,
    flatDockerCategories,
    isLoading: categoriesLoading,
  } = useDockerCategories();
  const {
    data: threads = [],
    isLoading: threadsLoading,
    error,
    isError: hasError,
  } = useThreadList(
    selectedCategory || selectedChapter || 0 // 소분류 > 중분류 > 전체 순서로 우선순위
  );

  const isLoading = categoriesLoading || threadsLoading;

  if (isLoading) {
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

  if (hasError) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <NestedSidebar data={docsData} />
          <main className="max-w-4xl px-4 py-10 mx-auto w-full">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-red-600">
                쓰레드를 불러오는 중 오류가 발생했습니다: {error?.message}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <NestedSidebar data={docsData} />

      {/* TODO: 추후 컴포넌트화 + props로 카테고리 받아서 여러 대분류 카테고리를 한번에 표현, 또는 각 카테고리별로 표현할 수 있어야겠다요. */}
      <main className="max-w-4xl px-4 py-10 mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            🐳 Docker 학습 쓰레드
            {(selectedChapter || selectedCategory) && (
              <div className="text-sm font-normal text-gray-600 mt-1">
                🖥️ 현재 위치: Docker
                {selectedChapter && (
                  <span>
                    {" > "}
                    {
                      dockerCategory?.children?.find(
                        (ch) => ch.id === selectedChapter
                      )?.name
                    }
                  </span>
                )}
                {selectedCategory && (
                  <span>
                    {" > "}
                    {
                      flatDockerCategories.find(
                        (cat) => cat.id === selectedCategory
                      )?.name
                    }
                  </span>
                )}
              </div>
            )}
          </h1>
          {isLogin && (
            <button
              onClick={() => navigate({ to: "/thread/write" })}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              글쓰기
            </button>
          )}
        </div>

        <div className="mb-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              📚 대분류
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedChapter(null);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                🐳 전체 Docker
              </button>
            </div>
          </div>

          {dockerCategory?.children && dockerCategory.children.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                📖 챕터별 주제
              </h3>
              <div className="flex flex-wrap gap-2">
                {dockerCategory.children.map((chapter) => (
                  <button
                    key={chapter.id}
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
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                📝 세부 내용
              </h3>
              <div className="flex flex-wrap gap-2">
                {dockerCategory.children
                  .find((chapter) => chapter.id === selectedChapter)
                  ?.children?.map((subTopic) => (
                    <button
                      key={subTopic.id}
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
        </div>

        <div className="space-y-6">
          {threads.map((thread) => (
            <ThreadCard
              key={thread.id}
              threadId={thread.id.toString()}
              title={thread.title}
              summary={
                thread.content?.slice(0, 100) + "..." || "내용이 없습니다."
              }
              content={thread.content}
              likes={thread.likes}
              dislikes={thread.dislikes || 0}
              comments={
                thread.comments?.map((comment) => comment.content) || []
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
};
