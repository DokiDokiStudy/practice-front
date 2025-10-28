import { FormInput, FormButton } from "@/shared/ui";
import { useFindPwdForm } from "../model";

export const FindPwdForm = () => {
  const { id, email, setId, setEmail, onSubmit, submitted, isLoading, navigate } =
    useFindPwdForm();

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        비밀번호 찾기
      </h2>

      {!submitted ? (
        <>
          <FormInput
            label="아이디"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />

          <FormInput
            label="가입된 이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />

          <FormButton type="submit" isLoading={isLoading}>
            비밀번호 찾기
          </FormButton>
        </>
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-semibold mb-6">
            이메일로 임시 비밀번호를 전송했습니다.
          </p>
          <FormButton
            type="button"
            onClick={() => navigate({ to: "/auth", search: { mode: "login" } })}
          >
            로그인 페이지로 이동
          </FormButton>
        </div>
      )}
    </form>
  );
};
