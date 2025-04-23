import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopNav from '../../components/common/TopNav';
import BoardLayout from '../../components/layout/BoardLayout';
import BoardForm from '../../components/board/BoardForm';

function BoardWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast.warn('로그인 후 글쓰기가 가능합니다.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('작성 완료:', { title, content });
    toast.success('게시글이 작성되었습니다!');
    navigate('/board');
  };
  return (
    <>
      <TopNav />
      <BoardLayout>
        <h2 className="text-2xl font-bold text-black-900 mb-6 text-center">✍️ 게시글 작성</h2>

        <BoardForm
          titleValue={title}
          contentValue={content}
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          onSubmit={handleSubmit}
          buttonText="작성 완료"
          buttonProps={{ color: 'green', size: 'md', loading: false }}
        />
      </BoardLayout>
    </>
  );

  // return (
  //   <>
  //     <TopNav />
  //     <BoardLayout>
  //         <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">✍️ 게시글 작성</h2>

  //         <form onSubmit={handleSubmit} className="space-y-6">
  //           <div>
  //             <label className="block text-gray-700 font-semibold mb-1">제목</label>
  //             <input
  //               type="text"
  //               value={title}
  //               onChange={(e) => setTitle(e.target.value)}
  //               className="w-full border border-gray-300 rounded-xl px-4 py-2"
  //               required
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-gray-700 font-semibold mb-1">내용</label>
  //             <textarea
  //               value={content}
  //               onChange={(e) => setContent(e.target.value)}
  //               className="w-full border border-gray-300 rounded-xl px-4 py-2 h-52"
  //               required
  //             />
  //           </div>

  //           <div className="text-center">
  //             <button
  //               type="submit"
  //               className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
  //             >
  //               작성 완료
  //             </button>
  //           </div>
  //         </form>
  //     </BoardLayout>
  //   </>
  // );
}

export default BoardWrite;
