import { FormInput, FormButton } from "@/shared/ui";
import { useRegisterForm } from "../model";

export const RegisterForm = () => {
  const {
    id,
    email,
    password,
    confirm,
    nickName,
    setId,
    setEmail,
    setPassword,
    setConfirm,
    setNickName,
    onSubmit,
    isLoading,
    error,
  } = useRegisterForm();

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        회원가입
      </h2>

      <FormInput
        label="닉네임"
        type="text"
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
        required
      />

      <FormInput
        label="아이디"
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />

      <FormInput
        label="이메일"
        type="email"
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

      <FormInput
        label="비밀번호 확인"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="비밀번호 확인"
        required
      />

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">
          {error}
        </p>
      )}

      <FormButton type="submit" isLoading={isLoading}>
        회원가입
      </FormButton>
    </form>
  );
};
