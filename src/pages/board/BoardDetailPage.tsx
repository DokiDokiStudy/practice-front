import { useParams } from "@tanstack/react-router";
import { BoardLayout, BoardDetailContent } from "@/widgets/board";

export function BoardDetailPage() {
  const { id } = useParams({ from: "/board/$id" });

  return (
    <BoardLayout>
      <BoardDetailContent postId={Number(id)} />
    </BoardLayout>
  );
}
