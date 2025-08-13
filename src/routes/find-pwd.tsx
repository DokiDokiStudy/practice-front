import { createFileRoute } from "@tanstack/react-router";
import FindPwd from "@/pages/users/FindPwd";

export const Route = createFileRoute("/find-pwd")({
  component: FindPwd,
});
