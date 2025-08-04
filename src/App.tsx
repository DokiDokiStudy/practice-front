import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Register from "./pages/users/Register";
import Login from "./pages/users/Login";
import FindUser from "./pages/users/FindUser";
import FindPwd from "./pages/users/FindPwd";
import Board from "./pages/board/Board";
import BoardWrite from "./pages/board/BoardWrite";
import BoardDetail from "./pages/board/BoardDetail";
import BoardEdit from "./pages/board/BoardEdit";
import DockerDocsOverview from "./pages/dockerDocs/DockerDocsOverview";
import DockerDocsDetail from "./pages/dockerDocs/DockerDocsDetail";
import ThreadList from "./pages/threads/ThreadList";
import ThreadDetail from "./pages/threads/ThreadDetail";
import ThreadWrite from "./pages/threads/ThreadWrite";
import ThreadEdit from "./pages/threads/ThreadEdit";
import MainLayout from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/themes/ThemeProvider";
import "../index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 토스트메시지 라이브러리
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 라우팅 명시는 여기서 하자
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <MainLayout>
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
              <Route path="/docker-docs" element={<DockerDocsOverview />} />
              <Route
                path="/docs/:projectId/:chapterId"
                element={<DockerDocsDetail />}
              />
              <Route path="/thread" element={<ThreadList />} />
              <Route path="/thread/:threadId" element={<ThreadDetail />} />
              <Route path="/thread/:threadId/edit" element={<ThreadEdit />} />
              <Route path="/thread/write" element={<ThreadWrite />} />
            </Routes>
          </MainLayout>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            closeOnClick
            // pauseOnHover // 호버 시 멈춤
            // pauseOnFocusLoss={false} // 커서가 화면 밖으로 나가도 프로그래스바 멈추지 않는 옵션 기본값은 True
          />
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
