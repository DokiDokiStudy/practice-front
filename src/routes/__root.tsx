import { createRootRoute, Outlet } from "@tanstack/react-router";
import TopNav from "@/components/common/TopNav";

export const Route = createRootRoute({
  component: () => (
    <>
      <TopNav />
      <Outlet />
    </>
  ),
});
