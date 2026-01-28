import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { postKeys } from "@/entities/post";
// import { useGetDocsList, DocsSidebar, DocsContent } from "@/features/docs";

export function DocsDetailPage() {
  const { chapterId } = useParams({
    from: "/docs/$category/$chapterId",
  });

  // const docsData = useGetDocsList();

  const searchParams = new URLSearchParams({ categoryId: chapterId });
  const {
    data: postListData,
    isLoading,
    error,
  } = useQuery(postKeys.list(searchParams));

  const currentPost = postListData?.posts?.[0];

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

    // return <DocsContent post={currentPost} />;
  };

  return (
    <div className="flex flex-1 bg-white">
      {/* <DocsSidebar docs={docsData} /> */}
      <main className="flex-1 relative px-6 py-10 max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}
