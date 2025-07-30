import BoardLayout from "../../components/layout/BoardLayout";
import Button from "../../components/common/Button";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "@/api/Board";
import { Link } from "@tanstack/react-router";

function Board() {
  // test 안해봄, 이렇게 사용
  // const loaderData = useLoader();

  const {
    data: posts,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["post"],
    queryFn: getBoard,
    // initialData: loaderData,
  });

  return (
    <>
      <BoardLayout>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">📌 게시판</h2>
          <Link to="/board/write">
            <Button color="teal" size="mb" /* disabled={!isLoggedIn} */>
              글쓰기
            </Button>
          </Link>
        </div>
        {/* 테이블 */}
        <table className="w-full text-left table-fixed border-t border-gray-300 mb-4">
          <thead>
            <tr className="text-gray-600 border-b border-gray-300">
              <th className="w-1/12 py-2 text-center">번호</th>
              <th className="w-6/12 py-2 text-center">제목</th>
              <th className="w-2/12 py-2 text-center">작성자</th>
              <th className="w-3/12 py-2 text-center">작성일</th>
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <>loading...</>
            ) : (
              posts.map((post, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 ${
                    post ? "hover:bg-white/70" : "text-gray-300"
                  }`}
                >
                  <td className="py-3 text-center">{post ? post.id : "-"}</td>
                  <td className="py-3 text-center">
                    {post ? (
                      <Link
                        to={`/board/${post.id}`}
                        className="text-black-700 hover:underline"
                      >
                        {post.title}
                      </Link>
                    ) : (
                      <span>게시글 없음</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {post ? post.author : "-"}
                  </td>
                  <td className="py-3 text-center">{post ? post.date : "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        {/* <div className="flex justify-center gap-2 text-sm mt-2">
          <Button
            color="gray"
            size="sm"
            disabled={currentPage == 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            ◀
          </Button>

          {[...Array(totalPages)].map((_, idx) => (
            <Button
              key={idx + 1}
              size="sm"
              color={currentPage == idx + 1 ? "teal" : "gray"}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}

          <Button
            color="gray"
            size="sm"
            disabled={currentPage == totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            ▶
          </Button>
        </div> */}
      </BoardLayout>
    </>
  );
}

export default Board;
