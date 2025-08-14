import { createRootRoute, Outlet } from "@tanstack/react-router";
import TopNav from "@/components/common/TopNav";
import { ThemeProvider } from "@/themes/ThemeProvider";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="h-screen flex flex-col">
        <TopNav />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  ),
});
