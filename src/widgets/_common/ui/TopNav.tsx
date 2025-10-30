import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/config";
import { Link, useNavigate } from "@tanstack/react-router";

export function TopNav() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate({ to: ROUTES.LOGIN });
  };
  return (
    <nav className="w-full p-4 flex justify-between items-center z-10 shadow-lg bg-white border-b border-gray-200">
      <Link to="/main" className="hover:scale-105 transition-transform">
        <h1 className="text-2xl font-bold tracking-widest text-blue-600">
          DOKYDOKY
        </h1>
      </Link>

      {!isLoading && (
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

          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="transition-colors hover:text-blue-600"
              >
                {user.nickName} (로그아웃)
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/auth/login"
                  className="transition-colors hover:text-blue-600"
                >
                  로그인
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="transition-colors hover:text-blue-600"
                >
                  회원가입
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}
