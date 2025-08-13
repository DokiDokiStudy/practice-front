import { createFileRoute } from "@tanstack/react-router";
import FindUser from "@/pages/users/FindUser";

export const Route = createFileRoute("/find-user")({
  component: FindUser,
});
