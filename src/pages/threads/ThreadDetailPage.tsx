import { ThreadDetail } from "@/widgets/thread";
import { useParams } from "@tanstack/react-router";

export const ThreadDetailPage = () => {
  const { id } = useParams({ from: "/thread/$id" });

  return <ThreadDetail id={id} />;
};
