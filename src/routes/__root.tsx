import { TopNav } from "@/widgets/_common";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNav />
      <Outlet />
    </div>
  ),
});
