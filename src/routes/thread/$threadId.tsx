import { createFileRoute } from "@tanstack/react-router";
import { ThreadDetailPage } from "@/pages/threads";

export const Route = createFileRoute("/thread/$threadId")({
  component: ThreadDetailPage,
});
