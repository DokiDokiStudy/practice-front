import { createFileRoute } from "@tanstack/react-router";
import { FindPwdPage } from "@/pages/auth";

export const Route = createFileRoute("/auth/find-pwd")({
  component: FindPwdPage,
});
