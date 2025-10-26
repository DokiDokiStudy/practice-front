import { DockerDocsPage } from "@/pages/docker-docs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docker-docs")({
  component: DockerDocsPage,
});
