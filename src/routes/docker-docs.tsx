import { DockerDocsOverview } from "@/pages/dockerDocs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docker-docs")({
  component: DockerDocsOverview,
});
