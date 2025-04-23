import { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopNav from '../../components/common/TopNav';
import BoardLayout from '../../components/layout/BoardLayout';
import BoardForm from '../../components/board/BoardForm';
import { toast } from 'react-toastify';

function BoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('userId', '관리자');

  const dummyPosts = [
    { id: 1, title: '공지사항입니다', author: '관리자', date: '2025-04-17', content: '공지 내용입니다.' },
    { id: 2, title: '문의드립니다.', author: '사용자1', date: '2025-04-16', content: '문의 내용입니다.' },
    { id: 3, title: '이벤트 안내', author: '운영자', date: '2025-04-15', content: '이벤트 내용입니다.' },
  ];

  const checkedRef = useRef(false);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;
  
    const found = dummyPosts.find((p) => String(p.id) == id);
    const userId = sessionStorage.getItem('userId');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') == 'true';
  
    if (!found) {
      toast.error('게시글을 찾을 수 없습니다.');
      return navigate('/board');
    }
  
    if (!isLoggedIn || found.author != userId) {
      toast.warn('수정 권한이 없습니다.');
      return navigate('/board');
    }
  
    setTitle(found.title);
    setContent(found.content);
  }, [id, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('수정된 내용:', { id, title, content });
    toast.success('게시글이 수정되었습니다!');
    navigate('/board');
  };

  return (
    <>
      <TopNav />
      <BoardLayout>
        <h2 className="text-2xl font-bold text-black-900 mb-6 text-center">✏️ 게시글 수정</h2>
        <BoardForm
          titleValue={title}
          contentValue={content}
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          onSubmit={handleUpdate}
          buttonText="수정 완료"
          buttonProps={{ color: 'green', size: 'md', loading: false }}
        />
      </BoardLayout>
    </>
  );

  // return (
  //   <>
  //     <TopNav />
  //     <BoardLayout>
  //       <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">✏️ 게시글 수정</h2>

  //       <form onSubmit={handleUpdate} className="space-y-6">
  //         <div>
  //           <label className="block text-gray-700 font-semibold mb-1">제목</label>
  //           <input
  //             type="text"
  //             value={title}
  //             onChange={(e) => setTitle(e.target.value)}
  //             className="w-full border border-gray-300 rounded-xl px-4 py-2"
  //             required
  //           />
  //         </div>

  //         <div>
  //           <label className="block text-gray-700 font-semibold mb-1">내용</label>
  //           <textarea
  //             value={content}
  //             onChange={(e) => setContent(e.target.value)}
  //             className="w-full border border-gray-300 rounded-xl px-4 py-2 h-52"
  //             required
  //           />
  //         </div>

  //         <div className="text-center">
  //           <button
  //             type="submit"
  //             className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
  //           >
  //             수정 완료
  //           </button>
  //         </div>
  //       </form>
  //     </BoardLayout>
  //   </>
  // );
}

export default BoardEdit;
