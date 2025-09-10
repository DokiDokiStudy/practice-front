import { DockerDocsDetail } from "@/pages/docs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/$projectId/$chapterId")({
  component: DockerDocsDetail,
});
