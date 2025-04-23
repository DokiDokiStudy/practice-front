import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import Register from './pages/users/Register';
import Login from './pages/users/Login';
import FindUser from './pages/users/FindUser';
import FindPwd from './pages/users/FindPwd';
import Board from './pages/board/Board';
import BoardWrite from './pages/board/BoardWrite';
import BoardDetail from './pages/board/BoardDetail';
import BoardEdit from './pages/board/BoardEdit';
import '../index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 토스트메시지 라이브러리

// 라우팅 명시는 여기서 하자
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find-user" element={<FindUser />} />
          <Route path="/find-pwd" element={<FindPwd />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/write" element={<BoardWrite />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/board/:id/edit" element={<BoardEdit />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={3000}
        closeOnClick
        // pauseOnHover // 호버 시 멈춤
        // pauseOnFocusLoss={false} // 커서가 화면 밖으로 나가도 프로그래스바 멈추지 않는 옵션 기본값은 True
      />
    </>
  );
}

export default App;
