import { BoardEditPage } from "@/pages/board";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/board/$id/edit")({
  component: BoardEditPage,
});
