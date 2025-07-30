import { createFileRoute } from "@tanstack/react-router";
import DockerDocsDetail from "@/pages/dockerDocs/DockerDocsDetail";

export const Route = createFileRoute("/docs/$projectId/$chapterId")({
  component: DockerDocsDetail,
});
