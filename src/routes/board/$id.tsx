import { BoardDetailPage } from "@/pages/board";
import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";

export const Route = createFileRoute("/board/$id")({
  component: () => {
    const matches = useMatches();
    const hasChildRoute = matches.length > 1 && matches[matches.length - 1].id !== "/board/$id";

    // 자식 라우트(/edit)가 있으면 자식 라우트를 렌더링, 없으면 상세 페이지 렌더링
    return hasChildRoute ? <Outlet /> : <BoardDetailPage />;
  },
});
