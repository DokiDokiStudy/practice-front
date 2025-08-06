import { createFileRoute } from "@tanstack/react-router";
import Login from "@/pages/users/Login";

export const Route = createFileRoute("/login")({
  component: Login,
});
