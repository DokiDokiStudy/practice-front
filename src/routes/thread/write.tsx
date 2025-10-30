import { createFileRoute } from "@tanstack/react-router";
import { ThreadWrite } from "@/pages/threads";

export const Route = createFileRoute("/thread/write")({
  component: ThreadWrite,
});
