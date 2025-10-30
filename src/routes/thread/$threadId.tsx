import { createFileRoute } from "@tanstack/react-router";
import { ThreadDetail } from "@/pages/threads";

export const Route = createFileRoute("/thread/$threadId")({
  component: ThreadDetail,
});
