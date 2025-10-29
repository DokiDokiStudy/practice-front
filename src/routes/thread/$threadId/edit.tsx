import { createFileRoute } from "@tanstack/react-router";
import { ThreadEdit } from "@/pages/threads";

export const Route = createFileRoute("/thread/$threadId/edit")({
  component: ThreadEdit,
});
