import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { authRoutes } from "./auth";
import { boardRoutes } from "./board";
import { dockerDocsRoutes } from "./dockerDocs";
import { threadRoutes } from "./thread";

const routeTree = rootRoute.addChildren([
  ...authRoutes,
  ...boardRoutes,
  ...dockerDocsRoutes,
  ...threadRoutes,
]);

export const router = createRouter({
  routeTree,
});
