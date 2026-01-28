import { useParams } from "@tanstack/react-router";
// import { DocsList, useGetDocsList } from "@/features/docs";

export const DocsListPage = () => {
  const { category } = useParams({ from: "/docs/$category/" });

  // const allDocs = useGetDocsList();
  // const categoryDoc = allDocs.find((doc) => doc.id === category);

  return (
    <div className="flex-1 bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* {categoryDoc ? (
          <>
            <h1 className="text-3xl font-bold mb-6">{categoryDoc.title}</h1>
            <DocsList docs={[categoryDoc]} />
          </>
        ) : (
          <p className="text-red-500 text-center">
            해당 카테고리를 찾을 수 없습니다.
          </p>
        )} */}
      </div>
    </div>
  );
};
