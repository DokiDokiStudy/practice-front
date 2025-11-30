import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { NestedSidebar } from "@/shared/ui";
import { SelectedStepThread, useDocsData } from "@/features/docs";

export const DocsChapterContent = () => {
  const location = useLocation();
  const { category = "docker", chapterId = "1" } = useParams({
    from: "/docs/$category/$chapterId",
  });
  const navigate = useNavigate();
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const docs = useDocsData();

  const categoryDoc = docs.find((doc) => doc.id === category);
  const chapter = categoryDoc?.chapters.find((c) => c.id === chapterId);

  const flatChapters = categoryDoc?.chapters ?? [];
  const currentIndex = flatChapters.findIndex((c) => c.id === chapterId);

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.substring(1));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const goToPrev = () => {
    if (currentIndex > 0) {
      navigate({
        to: "/docs/$category/$chapterId",
        params: { category, chapterId: flatChapters[currentIndex - 1].id },
      });
    }
  };

  const goToNext = () => {
    if (currentIndex < flatChapters.length - 1) {
      navigate({
        to: "/docs/$category/$chapterId",
        params: { category, chapterId: flatChapters[currentIndex + 1].id },
      });
    }
  };

  return (
    <div className="flex flex-1 bg-white">
      <NestedSidebar data={categoryDoc ? [categoryDoc] : []} />

      <main className="flex-1 relative px-6 py-10 max-w-4xl mx-auto">
        {currentIndex > 0 && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500 hover:text-black"
            onClick={goToPrev}
          >
            ⬅
          </button>
        )}
        {currentIndex < flatChapters.length - 1 && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500 hover:text-black"
            onClick={goToNext}
          >
            ➡
          </button>
        )}

        {chapter ? (
          <>
            <h1 className="text-2xl font-bold mb-6">{chapter.title}</h1>
            <div className="space-y-8">
              {chapter.steps.map((step) => (
                <section key={step.id} id={step.id}>
                  <h2
                    className="text-lg font-semibold mb-2 cursor-pointer hover:underline"
                    onClick={() => setSelectedStepId(step.id)}
                  >
                    {step.title}
                  </h2>
                  <p className="text-gray-800 leading-relaxed">
                    {step.content || "내용 없음"}
                  </p>
                </section>
              ))}
            </div>
          </>
        ) : (
          <p className="text-blue-500 text-center mt-20">
            해당 챕터를 찾을 수 없습니다.
          </p>
        )}

        <AnimatePresence>
          {selectedStepId && (
            <SelectedStepThread
              stepId={selectedStepId}
              onClose={() => setSelectedStepId(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
