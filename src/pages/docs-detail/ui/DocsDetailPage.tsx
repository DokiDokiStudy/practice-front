import { useParams } from "@tanstack/react-router";
import { NestedSidebar } from "@/shared/ui";
import { useGetDocsList } from "@/pages/docs-list/api/useGetDocsList";
import { useGetDocsDetail } from "../api/useGetDocsDetail";
import { DocsContent } from "./DocsContent";

export function DocsDetailPage() {
  const { category = "docker", chapterId = "1" } = useParams({
    from: "/docs/$category/$chapterId",
  });

  const docsData = useGetDocsList();
  const { data: post, isLoading, error } = useGetDocsDetail(chapterId);

  const categoryDoc = docsData.find((doc) => doc.id === category);

  if (isLoading) {
    return (
      <div className="flex flex-1 bg-white">
        <NestedSidebar data={categoryDoc ? [categoryDoc] : []} />
        <main className="flex-1 relative px-6 py-10 max-w-4xl mx-auto">
          <div className="text-center text-gray-600">로딩 중...</div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-1 bg-white">
        <NestedSidebar data={categoryDoc ? [categoryDoc] : []} />
        <main className="flex-1 relative px-6 py-10 max-w-4xl mx-auto">
          <div className="text-center text-red-600">
            콘텐츠를 불러올 수 없습니다.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 bg-white">
      <NestedSidebar data={categoryDoc ? [categoryDoc] : []} />
      <DocsContent post={post} />
    </div>
  );
}
