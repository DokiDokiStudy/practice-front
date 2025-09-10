import { FindPwd } from "@/pages/find-pwd";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/find-pwd")({
  component: FindPwd,
});
