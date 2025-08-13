import { createFileRoute } from "@tanstack/react-router";
import ThreadWrite from "@/pages/threads/ThreadWrite";

export const Route = createFileRoute("/thread/write")({
  component: ThreadWrite,
});
