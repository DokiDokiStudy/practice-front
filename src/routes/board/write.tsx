import { BoardWritePage } from "@/pages/board";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/board/write")({
  component: BoardWritePage,
});
