import { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../../components/common/TopNav';
import BoardLayout from '../../components/layout/BoardLayout';
import Button from '../../components/common/Button';

function Board() {
    const allPosts = [
        { id: 1, title: '공지사항입니다', author: '관리자', date: '2025-04-17' },
        { id: 2, title: '문의드립니다.', author: '사용자1', date: '2025-04-16' },
        { id: 3, title: '이벤트 안내1', author: '운영자', date: '2025-04-15' },
        { id: 4, title: '이벤트 안내2', author: '운영자', date: '2025-04-14' },
        { id: 5, title: '이벤트 안내3', author: '운영자', date: '2025-04-13' },
        { id: 6, title: '이벤트 안내4', author: '운영자', date: '2025-04-12' },
        { id: 7, title: '이벤트 안내5', author: '운영자', date: '2025-04-11' },
        { id: 8, title: '이벤트 안내6', author: '운영자', date: '2025-04-10' },
        { id: 9, title: '이벤트 안내7', author: '운영자', date: '2025-04-09' },
        { id: 10, title: '이벤트 안내8', author: '운영자', date: '2025-04-08' },
        { id: 11, title: '이벤트 안내9', author: '운영자', date: '2025-04-07' },
        { id: 12, title: '이벤트 안내10', author: '운영자', date: '2025-04-06' },
    ];

    const isLoggedIn = sessionStorage.getItem('isLoggedIn') == 'true';

    const postsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    const startIdx = (currentPage - 1) * postsPerPage;
    const currentPosts = allPosts.slice(startIdx, startIdx + postsPerPage);

    const rows = [...currentPosts];
    while (rows.length < postsPerPage) {
        rows.push(null);
    }

    return (
        <>
            <TopNav />
            <BoardLayout>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">📌 게시판</h2>
                    {isLoggedIn ? (
                        <Link to="/board/write">
                            <Button color="teal" size="mb">글쓰기</Button>
                        </Link>
                    ) : (
                        <Link to="/board/write">
                            <Button color="gray" size="mb" disabled>글쓰기</Button>
                        </Link>
                    )}
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
                        {rows.map((post, idx) => (
                            <tr
                                key={idx}
                                className={`border-b border-gray-200 ${post ? 'hover:bg-white/70' : 'text-gray-300'
                                    }`}
                            >
                                <td className="py-3 text-center">{post ? post.id : '-'}</td>
                                <td className="py-3 text-center">
                                    {post ? (
                                        <Link to={`/board/${post.id}`} className="text-black-700 hover:underline">
                                            {post.title}
                                        </Link>
                                    ) : (
                                        <span>게시글 없음</span>
                                    )}
                                </td>
                                <td className="py-3 text-center">{post ? post.author : '-'}</td>
                                <td className="py-3 text-center">{post ? post.date : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 페이지네이션 */}
                <div className="flex justify-center gap-2 text-sm mt-2">
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
                            color={currentPage == idx + 1 ? 'teal' : 'gray'}
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
                </div>
            </BoardLayout>
        </>
    );
}

export default Board;
