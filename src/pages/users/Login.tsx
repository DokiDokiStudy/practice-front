import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { api } from "@shared/api";
import AuthLayout from "@widgets/layout/ui/AuthLayout";
import { useTheme } from "@/shared/theme";

function Login() {
  // const [id, setId] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { classes } = useTheme();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.data.token;
      const nickName = res.data.data.nickName;
      const user_email = res.data.data.email;
      const user_role = res.data.data.role;

      if (token && nickName && user_email) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: token,
            nickName: nickName,
            email: user_email,
            role: user_role,
          })
        );
        toast.success("로그인 성공!");
        navigate({ to: "/main" });
      } else {
        setError("로그인 실패 다시 시도 해주세요.");
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message ||
          "아이디 또는 비밀번호를 다시 확인해주세요."
      );
      toast.error("로그인 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleLogin}
        className={`p-10 pt-16 rounded-3xl shadow-2xl w-full max-w-md ${classes.surface} ${classes.surfaceBorder}`}
        style={classes.surfaceBorderStyle}
      >
        <h2
          className={`text-3xl text-center mb-8 ${classes.title}`}
          style={classes.titleStyle}
        >
          로그인
        </h2>
        <label className="block mb-6">
          <span className={`${classes.label}`} style={classes.labelStyle}>
            이메일
          </span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-2 block w-full rounded-2xl px-5 py-3 transition shadow-sm ${classes.inputBorder} ${classes.inputFocus}`}
            style={{
              ...classes.inputBackgroundStyle,
              ...classes.inputBorderStyle,
              ...classes.inputTextStyle,
              ...classes.inputPlaceholderStyle,
            }}
            placeholder="example@docker.com"
            required
            onFocus={(e) =>
              Object.assign(
                (e.target as HTMLElement).style,
                classes.inputFocusStyle
              )
            }
            onBlur={(e) =>
              Object.assign(
                (e.target as HTMLElement).style,
                classes.inputBorderStyle
              )
            }
          />
        </label>
        <label className="block mb-8">
          <span className={`${classes.label}`} style={classes.labelStyle}>
            비밀번호
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-2 block w-full rounded-2xl px-5 py-3 transition shadow-sm ${classes.inputBorder} ${classes.inputFocus}`}
            style={{
              ...classes.inputBackgroundStyle,
              ...classes.inputBorderStyle,
              ...classes.inputTextStyle,
              ...classes.inputPlaceholderStyle,
            }}
            placeholder="비밀번호 입력"
            required
            onFocus={(e) =>
              Object.assign(
                (e.target as HTMLElement).style,
                classes.inputFocusStyle
              )
            }
            onBlur={(e) =>
              Object.assign(
                (e.target as HTMLElement).style,
                classes.inputBorderStyle
              )
            }
          />
        </label>
        {error && (
          <p className="text-red-500 text-base mb-6 text-center font-semibold">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-2xl text-lg mb-4 disabled:opacity-50 ${classes.buttonPrimary}`}
          style={classes.buttonPrimaryStyle}
          onMouseEnter={(e) =>
            !isLoading &&
            Object.assign(
              (e.target as HTMLElement).style,
              classes.buttonPrimaryHoverStyle
            )
          }
          onMouseLeave={(e) =>
            !isLoading &&
            Object.assign(
              (e.target as HTMLElement).style,
              classes.buttonPrimaryStyle
            )
          }
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span>로그인 중...</span>
            </div>
          ) : (
            "로그인"
          )}
        </button>
        <div className="flex justify-between items-center mb-2">
          <Link
            to="/register"
            className={`hover:underline font-semibold text-sm`}
            style={classes.textSecondaryStyle}
          >
            회원가입
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/find-user"
              className={`hover:underline font-semibold`}
              style={classes.textSecondaryStyle}
            >
              아이디 찾기
            </Link>
            <span style={classes.textSecondaryStyle}>|</span>
            <Link
              to="/find-pwd"
              className={`hover:underline font-semibold`}
              style={classes.textSecondaryStyle}
            >
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
