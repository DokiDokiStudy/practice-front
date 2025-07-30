import BoardWrite from "../pages/board/BoardWrite";
import BoardDetail from "../pages/board/BoardDetail";
import BoardEdit from "../pages/board/BoardEdit";
import { ROUTES } from "../constants/routes";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const boardRoutes = [
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.BOARD.LIST,
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
