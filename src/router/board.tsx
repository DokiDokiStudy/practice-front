import Board from "../pages/board/Board";
import BoardWrite from "../pages/board/BoardWrite";
import BoardDetail from "../pages/board/BoardDetail";
import BoardEdit from "../pages/board/BoardEdit";
import { ROUTES } from "../constants/routes";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { getBoard } from "../api/Board";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "@/App";

export const boardRoutes = [
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.BOARD.LIST,
    loader: () =>
      queryClient.fetchQuery({
        queryKey: ["post"],
        queryFn: getBoard,
      }),
    component: Board,
    pendingComponent: () => <div>loading...</div>,
    errorComponent: ({ error }) => <div>error: {error.message}</div>,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.BOARD.WRITE,
    component: BoardWrite,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.BOARD.DETAIL.PATH,
    component: BoardDetail,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.BOARD.EDIT.PATH,
    component: BoardEdit,
  }),
];
