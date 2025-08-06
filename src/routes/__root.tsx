import { createRootRoute, Outlet } from "@tanstack/react-router";
import TopNav from "@/components/common/TopNav";
import { ThemeProvider } from "@/themes/ThemeProvider";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="flex flex-col h-screen">
        <TopNav />
        <Outlet />
      </div>
    </ThemeProvider>
  ),
});
