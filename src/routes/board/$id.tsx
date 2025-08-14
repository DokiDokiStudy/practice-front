import { createFileRoute } from "@tanstack/react-router";
import { BoardDetailPage } from "@/features/board";

export const Route = createFileRoute("/board/$id")({
  component: BoardDetailPage,
});
