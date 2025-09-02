import Main from "@/pages/main/Main";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/main")({
  component: Main,
});
