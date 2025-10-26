import { FindUser } from "@/pages/find-user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/find-user")({
  component: FindUser,
});
