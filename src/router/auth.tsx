import Login from "../pages/users/Login";
import Register from "../pages/users/Register";
import FindUser from "../pages/users/FindUser";
import FindPwd from "../pages/users/FindPwd";
import Main from "../pages/Main";
import Home from "../pages/Home";
import { ROUTES } from "../constants/routes";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const authRoutes = [
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.HOME,
    component: Home,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.MAIN,
    component: Main,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.LOGIN,
    component: Login,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.REGISTER,
    component: Register,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.FIND_USER,
    component: FindUser,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.FIND_PWD,
    component: FindPwd,
  }),
];
