import { createFileRoute } from "@tanstack/react-router";
import BoardEdit from "@/pages/board/BoardEdit";

export const Route = createFileRoute("/board/$id/edit")({
  component: BoardEdit,
});
