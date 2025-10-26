import { AuthPage } from "@/pages/auth";
import { createFileRoute } from "@tanstack/react-router";

type AuthSearch = {
  mode?: "login" | "register" | "find-user" | "find-pwd";
};

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  validateSearch: (search: Record<string, unknown>): AuthSearch => {
    return {
      mode: search.mode as AuthSearch["mode"],
    };
  },
});
