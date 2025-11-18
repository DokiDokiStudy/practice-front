import { BoardListPage } from "@/features/board";
import { BoardLayout, BoardHeader } from "@/widgets/board";

export function BoardPage() {
  return (
    <BoardLayout>
      <BoardHeader />
      <BoardListPage />
    </BoardLayout>
  );
}
