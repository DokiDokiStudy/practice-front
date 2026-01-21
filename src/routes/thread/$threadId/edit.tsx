import { createFileRoute } from "@tanstack/react-router";
import { ThreadEditPage } from "@/pages/threads";

export const Route = createFileRoute("/thread/$threadId/edit")({
  component: ThreadEditPage,
});
