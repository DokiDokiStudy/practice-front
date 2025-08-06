import { createFileRoute } from "@tanstack/react-router";
import BoardDetail from "@/pages/board/BoardDetail";

export const Route = createFileRoute("/board/$id")({
  component: BoardDetail,
});
