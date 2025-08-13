import { createFileRoute } from "@tanstack/react-router";
import DockerDocsOverview from "@/pages/dockerDocs/DockerDocsOverview";

export const Route = createFileRoute("/docker-docs")({
  component: DockerDocsOverview,
});
