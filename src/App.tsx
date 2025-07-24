import "../index.css";
import { BrowserRouter as LegacyRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 토스트메시지 라이브러리
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

// 라우팅 명시는 여기서 하자
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LegacyRouter>
          <RouterProvider router={router} />
        </LegacyRouter>
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
