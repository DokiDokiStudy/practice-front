import { Button } from "@/shared/ui";

interface BoardPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BoardPagination({
  page,
  totalPages,
  onPageChange,
}: BoardPaginationProps) {
  return (
    <div className="flex justify-center gap-2 text-sm">
      <Button
        color="gray"
        size="sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ◀ 이전
      </Button>
      <span className="flex items-center px-2">
        {page} / {totalPages} 페이지
      </span>
      <Button
        color="gray"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        다음 ▶
      </Button>
    </div>
  );
}
