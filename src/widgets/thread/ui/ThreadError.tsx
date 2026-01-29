// import { docsData } from "@/features/docs";
// import { NestedSidebar } from "@/shared/ui";

export const ThreadError = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* <NestedSidebar data={docsData} /> */}
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
};
