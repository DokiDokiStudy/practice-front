import { createFileRoute } from "@tanstack/react-router";
import { BoardEditPage } from "@/features/board";

export const Route = createFileRoute("/board/$id/edit")({
  component: BoardEditPage,
});
