import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/pages/auth";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
