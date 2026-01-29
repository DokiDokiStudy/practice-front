import { useParams } from "@tanstack/react-router";
import { DocsList, useGetDocsList } from "@/features/docs";
import { Fragment } from "react/jsx-runtime";

export const DocsListPage = () => {
  const { category } = useParams({ from: "/docs/$category/" });

  const allDocs = useGetDocsList();
  console.log(allDocs);

  return (
    <div className="flex-1 bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {allDocs?.length ? (
          allDocs.map((doc) => (
            <Fragment key={doc.id}>
              <h1 className="text-3xl font-bold mb-6">{doc?.title}</h1>
              <DocsList docs={doc.steps} />
            </Fragment>
          ))
        ) : (
          <p className="text-red-500 text-center">
            카테고리를 찾을 수 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};
