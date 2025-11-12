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
    </form>
  );
};
