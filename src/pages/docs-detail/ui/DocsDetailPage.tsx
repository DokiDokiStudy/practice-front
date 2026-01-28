import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { postKeys } from "@/entities/post";
import { useGetDocsList, DocsSidebar, DocsContent } from "@/features/docs";

export function DocsDetailPage() {
  const { category, postId } = useParams({
    from: "/docs/$category/$postId",
  });

  const docs = useGetDocsList({ categoryName: category });

  const {
    data: currentPost,
    isLoading,
    error,
  } = useQuery(postKeys.detail(Number(postId)));

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-600">로딩 중...</div>;
    }

    if (error || !currentPost) {
      return (
        <div className="text-center text-red-600">
          콘텐츠를 불러올 수 없습니다.
        </div>
      );
    }

    return <DocsContent post={currentPost} />;
  };

  if (!docs) {
    return (
      <div className="flex-1 bg-white py-10 px-4 text-center text-red-500">
        해당 카테고리를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-1 bg-white">
      <DocsSidebar docs={docs} />
      <main className="flex-1 relative px-6 py-10 max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}
