import { DocsDetailPage } from "@/pages/docs-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/$category/$postId")({
  component: DocsDetailPage,
});
