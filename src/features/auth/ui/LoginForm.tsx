import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/shared/theme";
import { useLogin } from "@/features/auth/model/useLogin";

export const LoginForm = () => {
  const { classes } = useTheme();
  const { handleLogin, isLoading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <form
      onSubmit={onSubmit}
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
      >
        {isLoading ? "로그인 중..." : "로그인"}
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
            className="hover:underline font-semibold"
            style={classes.textSecondaryStyle}
          >
            아이디 찾기
          </Link>
          <span style={classes.textSecondaryStyle}>|</span>
          <Link
            to="/find-pwd"
            className="hover:underline font-semibold"
            style={classes.textSecondaryStyle}
          >
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </form>
  );
};
