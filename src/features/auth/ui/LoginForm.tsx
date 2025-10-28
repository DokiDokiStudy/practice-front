import { Link } from "@tanstack/react-router";
import { useTheme } from "@/shared/theme";
import { FormInput, FormButton } from "@/shared/ui";
import { useLoginForm } from "../model";

export const LoginForm = () => {
  const { classes } = useTheme();
  const { email, password, setEmail, setPassword, onSubmit, isLoading, error } =
    useLoginForm();

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

      <FormInput
        label="이메일"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@docker.com"
        required
      />

      <FormInput
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호 입력"
        required
      />

      {error && (
        <p className="text-red-500 text-base mb-6 text-center font-semibold">
          {error}
        </p>
      )}

      <FormButton type="submit" isLoading={isLoading} loadingText="로그인 중...">
        로그인
      </FormButton>

      <div className="flex justify-between items-center mb-2">
        <Link
          to="/auth"
          search={{ mode: "register" }}
          className={`hover:underline font-semibold text-sm`}
          style={classes.textSecondaryStyle}
        >
          회원가입
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/auth"
            search={{ mode: "find-user" }}
            className="hover:underline font-semibold"
            style={classes.textSecondaryStyle}
          >
            아이디 찾기
          </Link>
          <span style={classes.textSecondaryStyle}>|</span>
          <Link
            to="/auth"
            search={{ mode: "find-pwd" }}
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
