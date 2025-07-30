import { createFileRoute } from "@tanstack/react-router";
import ThreadList from "@/pages/threads/ThreadList";

export const Route = createFileRoute("/thread/")({
  component: ThreadList,
});
