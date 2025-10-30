import { BoardLayout } from "@/widgets/_common";
import { BoardHeader, BoardListContent } from "@/widgets/board";

export function BoardPage() {
  return (
    <BoardLayout>
      <BoardHeader />
      <BoardListContent />
    </BoardLayout>
  );
}
