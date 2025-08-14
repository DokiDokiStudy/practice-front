import { createFileRoute } from "@tanstack/react-router";
import { BoardWritePage } from "@/features/board";

export const Route = createFileRoute("/board/write")({
  component: BoardWritePage,
});
