import { createFileRoute } from "@tanstack/react-router";
import { FindUserPage } from "@/pages/auth";

export const Route = createFileRoute("/auth/find-user")({
  component: FindUserPage,
});
