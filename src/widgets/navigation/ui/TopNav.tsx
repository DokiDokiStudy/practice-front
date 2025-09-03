import { useAuth } from "@/features";
import { ROUTES } from "@/shared/config";
import { useTheme } from "@/shared/theme";
import { Link, useNavigate } from "@tanstack/react-router";

function TopNav() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { classes } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate({ to: ROUTES.LOGIN });
  };
  return (
    <nav
      className={`w-full p-4 flex justify-between items-center z-10 shadow-lg ${classes.navBackground}`}
      style={classes.navBackgroundStyle}
    >
      <Link to="/main" className="hover:scale-105 transition-transform">
        <h1
          className={`text-2xl font-bold tracking-widest drop-shadow-sm ${classes.navText}`}
        >
          DOKYDOKY
        </h1>
      </Link>

      {!isLoading && (
        <ul className={`flex space-x-6 font-semibold ${classes.navText}`}>
          <li>
            <Link
              to="/main"
              className={`transition-colors ${classes.navHover}`}
            >
              메인
            </Link>
          </li>
          <li>
            <Link
              to="/board"
              className={`transition-colors ${classes.navHover}`}
            >
              게시판
            </Link>
          </li>

          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className={`transition-colors ${classes.navHover}`}
              >
                {user.nickName} (로그아웃)
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`transition-colors ${classes.navHover}`}
                >
                  로그인
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`transition-colors ${classes.navHover}`}
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

export default TopNav;
