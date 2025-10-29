import { useParams } from "@tanstack/react-router";
import { BoardLayout } from "@/widgets/_common";
import { BoardEditForm } from "@/widgets/board";

export function BoardEditPage() {
  const { id } = useParams({ from: "/board/$id/edit" });

  return (
    <BoardLayout>
      <BoardEditForm postId={Number(id)} />
    </BoardLayout>
  );
}
