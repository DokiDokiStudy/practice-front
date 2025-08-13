import { createFileRoute } from "@tanstack/react-router";
import BoardWrite from "@/pages/board/BoardWrite";

export const Route = createFileRoute("/board/write")({
  component: BoardWrite,
});
