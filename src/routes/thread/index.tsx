import { createFileRoute } from "@tanstack/react-router";
import { ThreadListPage } from "@/pages/threads";

export const Route = createFileRoute("/thread/")({
  component: ThreadListPage,
});
