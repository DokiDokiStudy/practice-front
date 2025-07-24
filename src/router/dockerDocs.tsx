import DockerDocsOverview from "../pages/dockerDocs/DockerDocsOverview";
import DockerDocsDetail from "../pages/dockerDocs/DockerDocsDetail";
import { ROUTES } from "../constants/routes";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const dockerDocsRoutes = [
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.DOCKER_DOCS,
    component: DockerDocsOverview,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.DOCS_DETAIL.PATH,
    component: DockerDocsDetail,
  }),
];
