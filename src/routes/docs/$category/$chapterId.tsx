import { DocsChapterPage } from "@/pages/docs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/$category/$chapterId")({
  component: DocsChapterPage,
});
