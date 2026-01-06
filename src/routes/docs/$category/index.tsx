import { DocsListPage } from "@/pages/docs-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/$category/")({
  component: DocsListPage,
});
