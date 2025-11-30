import { useParams } from "@tanstack/react-router";
import { DocsSectionList, useDocsData } from "@/features/docs";

export function DocsCategoryPage() {
  const { category } = useParams({ from: "/docs/$category/" });
  const allDocs = useDocsData();

  const categoryDoc = allDocs.find((doc) => doc.id === category);

  if (!categoryDoc) {
    return (
      <div className="flex-1 bg-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500 text-center">
            해당 카테고리를 찾을 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{categoryDoc.title}</h1>
        <DocsSectionList docs={[categoryDoc]} />
      </div>
    </div>
  );
}
