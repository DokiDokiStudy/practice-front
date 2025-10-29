import { useParams } from "@tanstack/react-router";
import { BoardLayout } from "@/widgets/_common";
import { BoardDetailContent } from "@/widgets/board";

export function BoardDetailPage() {
  const { id } = useParams({ from: "/board/$id" });

  return (
    <BoardLayout>
      <BoardDetailContent postId={Number(id)} />
    </BoardLayout>
  );
}
