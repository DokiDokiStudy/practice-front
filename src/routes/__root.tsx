import { createRootRoute, Outlet } from "@tanstack/react-router";
import TopNav from "@widgets/navigation/ui/TopNav";
import { ThemeProvider } from "@app/providers/themes/ThemeProvider";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <TopNav />
      <Outlet />
    </ThemeProvider>
  ),
});
