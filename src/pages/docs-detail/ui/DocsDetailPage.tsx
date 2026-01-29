import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { postKeys } from "@/entities/post";
import { useGetDocsList, DocsSidebar, DocsContent } from "@/features/docs";
import { extractChapterNumber } from "@/features/docs/lib/transformCategoriesToDocs";

export function DocsDetailPage() {
  const { category, chapterId } = useParams({
    from: "/docs/$category/$chapterId",
  });

  const searchParams = new URLSearchParams({ categoryId: category });
  const {
    data: postListData,
    isLoading,
    error,
  } = useQuery(postKeys.listFilterWithCategory(searchParams));
  console.log(postListData);

  const postList = postListData?.posts;

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-600">로딩 중...</div>;
    }

    if (error || !postList) {
      return (
        <div className="text-center text-red-600">
          콘텐츠를 불러올 수 없습니다.
        </div>
      );
    }

    const sortedPostList = postList.sort((a, b) => {
      return a.title > b.title ? 1 : -1;
    });

    return sortedPostList.map((post) => (
      <DocsContent key={post.id} post={post} />
    ));
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
