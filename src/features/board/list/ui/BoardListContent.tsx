import { useState } from "react";
import { ErrorMessage, LoadingMsg } from "@/shared/ui";
import { usePosts, BoardList, BoardPagination } from "@/features/board";

export const BoardListContent = () => {
  const [page, setPage] = useState(1);
  const { posts, totalPages, isLoading, isError, error } = usePosts(page, 10);

  if (isLoading) {
    return <LoadingMsg />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }

  return (
    <>
      <BoardList posts={posts} />
      <BoardPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </>
  );
};
