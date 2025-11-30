import { BoardLayout, BoardHeader } from "@/widgets/board";
import { BoardListPage } from "@/widgets/board/ui/BoardListPage";

export function BoardPage() {
  return (
    <BoardLayout>
      <BoardHeader />
      <BoardListPage />
    </BoardLayout>
  );
}
