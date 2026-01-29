import { BoardDetailPage } from "@/pages/board";
import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/board/$id")({
  component: () => {
    const matchRoute = useMatchRoute();
    const isEditPage = matchRoute({ to: "/board/$id/edit" });

    return isEditPage ? <Outlet /> : <BoardDetailPage />;
  },
});
