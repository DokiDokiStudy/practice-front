import { createFileRoute } from "@tanstack/react-router";
import { BoardPage } from "@/features/board";

export const Route = createFileRoute("/board/")({
  component: BoardPage,
});
