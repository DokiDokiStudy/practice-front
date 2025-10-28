import { FormInput, FormButton } from "@/shared/ui";
import { useFindUserForm } from "../model";

export const FindUserForm = () => {
  const { email, setEmail, onSubmit, submitted, isLoading, navigate } =
    useFindUserForm();

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        아이디 찾기
      </h2>

      {!submitted ? (
        <>
          <FormInput
            label="가입된 이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />

          <FormButton type="submit" isLoading={isLoading}>
            아이디 찾기
          </FormButton>
        </>
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-semibold mb-6">
            입력한 이메일로 아이디 정보를 전송했습니다.
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
