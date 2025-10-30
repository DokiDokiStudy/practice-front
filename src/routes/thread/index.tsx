import { createFileRoute } from "@tanstack/react-router";
import { ThreadList } from "@/pages/threads";

export const Route = createFileRoute("/thread/")({
  component: ThreadList,
});
