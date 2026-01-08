import { createFileRoute } from "@tanstack/react-router";
import { ThreadWritePage } from "@/pages/threads";

export const Route = createFileRoute("/thread/write")({
  component: ThreadWritePage,
});
