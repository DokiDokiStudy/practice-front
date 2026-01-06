import { useParams } from "@tanstack/react-router";
import { BoardLayout, BoardEditForm } from "@/widgets/board";

export function BoardEditPage() {
  const { id } = useParams({ from: "/board/$id/edit" });
  console.log("edit");

  return (
    <BoardLayout>
      <BoardEditForm postId={Number(id)} />
    </BoardLayout>
  );
}
