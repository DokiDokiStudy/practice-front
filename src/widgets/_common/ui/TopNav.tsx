import { Link } from "@tanstack/react-router";
import { useAuth } from "@/shared/lib/auth";

export function TopNav() {
  const { isLogin, logout } = useAuth();

  return (
    <nav className="w-full p-4 flex justify-between items-center z-10 shadow-lg bg-white border-b border-gray-200">
      <Link to="/main" className="hover:scale-105 transition-transform">
        <h1 className="text-2xl font-bold tracking-widest text-blue-600">
          DOKYDOKY
        </h1>
      </Link>

      <ul className="flex space-x-6 font-semibold text-gray-700">
        <li>
          <Link to="/main" className="transition-colors hover:text-blue-600">
            메인
          </Link>
        </li>
        <li>
          <Link to="/board" className="transition-colors hover:text-blue-600">
            게시판
          </Link>
        </li>

        {isLogin ? (
          <li>
            <button
              onClick={logout}
              className="transition-colors hover:text-blue-600"
            >
              로그아웃
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="transition-colors hover:text-blue-600"
              >
                로그인
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="transition-colors hover:text-blue-600"
              >
                회원가입
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
