import { BoardLayout } from "@/widgets/_common";
import { BoardHeader, BoardListContent } from "@/features/board/list";

export function BoardPage() {
  return (
    <BoardLayout>
      <BoardHeader />
      <BoardListContent />
    </BoardLayout>
  );
}
