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
import "../index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 토스트메시지 라이브러리
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import { ROUTES } from "./constants/routes";

// 라우팅 명시는 여기서 하자
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={ROUTES.MAIN} element={<Main />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Register />} />
              <Route path={ROUTES.FIND_USER} element={<FindUser />} />
              <Route path={ROUTES.FIND_PWD} element={<FindPwd />} />

              <Route path={ROUTES.BOARD.LIST} element={<Board />} />
              <Route path={ROUTES.BOARD.WRITE} element={<BoardWrite />} />
              <Route
                path={ROUTES.BOARD.DETAIL.PATH}
                element={<BoardDetail />}
              />
              <Route path={ROUTES.BOARD.EDIT.PATH} element={<BoardEdit />} />

              <Route
                path={ROUTES.DOCKER_DOCS}
                element={<DockerDocsOverview />}
              />
              <Route
                path={ROUTES.DOCS_DETAIL.PATH}
                element={<DockerDocsDetail />}
              />

              <Route path={ROUTES.THREAD.LIST} element={<ThreadList />} />
              <Route path={ROUTES.THREAD.WRITE} element={<ThreadWrite />} />
              <Route
                path={ROUTES.THREAD.DETAIL.PATH}
                element={<ThreadDetail />}
              />
              <Route path={ROUTES.THREAD.EDIT.PATH} element={<ThreadEdit />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          closeOnClick
          // pauseOnHover // 호버 시 멈춤
          // pauseOnFocusLoss={false} // 커서가 화면 밖으로 나가도 프로그래스바 멈추지 않는 옵션 기본값은 True
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
