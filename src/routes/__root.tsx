import { ThemeProvider } from "@/shared/theme";
import { TopNav } from "@/widgets/_common";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <Outlet />
      </div>
    </ThemeProvider>
  ),
});
