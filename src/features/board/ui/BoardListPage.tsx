import { useState } from "react";
import { ErrorMessage, LoadingMsg } from "@/shared/ui";
import { PostList } from "@/entities/post/ui";
import { useBoardList, BoardPagination } from "@/features/board";

export const BoardListPage = () => {
  const [page, setPage] = useState(1);
  const { posts, totalPages, isLoading, isError, error } = useBoardList(
    page,
    10
  );

  if (isLoading) {
    return <LoadingMsg />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }

  return (
    <>
      <PostList posts={posts} />
      <BoardPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </>
  );
};
