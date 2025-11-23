import { FormInput, FormButton } from "@/shared/ui";
import { useRegister } from "../model";
import { FormEvent, useState } from "react";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, isLoading } = useRegister();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleRegister({ email, name, password, nickName });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        회원가입
      </h2>

      <FormInput
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@email.com"
        required
      />

      <FormInput
        label="이름"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
        required
      />

      <FormInput
        label="닉네임"
        type="text"
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
        placeholder="닉네임을 입력하세요"
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

      <FormButton type="submit" isLoading={isLoading} loadingText="가입 중...">
        회원가입
      </FormButton>
    </form>
  );
};
