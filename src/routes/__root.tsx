import { ThemeProvider } from "@/shared";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import TopNav from "@widgets/navigation/ui/TopNav";

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
