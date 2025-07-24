import ThreadList from "../pages/threads/ThreadList";
import ThreadDetail from "../pages/threads/ThreadDetail";
import ThreadWrite from "../pages/threads/ThreadWrite";
import ThreadEdit from "../pages/threads/ThreadEdit";
import { ROUTES } from "../constants/routes";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const threadRoutes = [
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.THREAD.LIST,
    component: ThreadList,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.THREAD.WRITE,
    component: ThreadWrite,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.THREAD.DETAIL.PATH,
    component: ThreadDetail,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.THREAD.EDIT.PATH,
    component: ThreadEdit,
  }),
];
