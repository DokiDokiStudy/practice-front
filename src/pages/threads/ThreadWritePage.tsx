import { useNavigate } from "@tanstack/react-router";
// import { NestedSidebar } from "@/shared/ui";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/shared/lib/auth";
// import { docsData } from "@/features/docs";
import { ThreadWriteForm } from "@/features/threadForm";

export const ThreadWritePage = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  if (!isLogin) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          {/* <NestedSidebar data={docsData} /> */}
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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* <NestedSidebar data={docsData} /> */}

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
              <h1 className="text-2xl font-bold text-gray-900">
                🐳 Docker 학습 쓰레드 작성
              </h1>
            </div>
          </div>
          <ThreadWriteForm />
        </main>
      </div>
    </div>
  );
};
