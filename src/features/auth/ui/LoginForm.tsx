import { Link } from "@tanstack/react-router";
import { FormInput, FormButton } from "@/shared/ui";
import { useLoginForm } from "../model";

export const LoginForm = () => {
  const { email, password, setEmail, setPassword, onSubmit, isLoading } =
    useLoginForm();

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        로그인
      </h2>

      <FormInput
        label="이메일"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@email.com"
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

      <FormButton
        type="submit"
        isLoading={isLoading}
        loadingText="로그인 중..."
      >
        로그인
      </FormButton>
      {/* TODO: 아이디 찾기, 비밀번호 찾기 논의 필요 */}
      {/* <div className="flex justify-between items-center text-sm text-gray-600">
        <Link
          to="/auth/register"
          className="hover:underline hover:text-blue-600 font-medium"
        >
          회원가입
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/auth/find-user"
            className="hover:underline hover:text-blue-600 font-medium"
          >
            아이디 찾기
          </Link>
          <span>|</span>
          <Link
            to="/auth/find-pwd"
            className="hover:underline hover:text-blue-600 font-medium"
          >
            비밀번호 찾기
          </Link>
        </div>
      </div> */}
    </form>
  );
};
