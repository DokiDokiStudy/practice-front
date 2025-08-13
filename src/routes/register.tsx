import { createFileRoute } from "@tanstack/react-router";
import Register from "@/pages/users/Register";

export const Route = createFileRoute("/register")({
  component: Register,
});
