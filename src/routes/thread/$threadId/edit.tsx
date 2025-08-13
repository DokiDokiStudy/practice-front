import { createFileRoute } from "@tanstack/react-router";
import ThreadEdit from "@/pages/threads/ThreadEdit";

export const Route = createFileRoute("/thread/$threadId/edit")({
  component: ThreadEdit,
});
