import { useTheme } from "@/shared/theme";
import { FormInput, FormButton } from "@/shared/ui";
import { useRegisterForm } from "../model";

export const RegisterForm = () => {
  const { classes } = useTheme();
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
      className={`p-10 pt-16 rounded-3xl shadow-2xl w-full max-w-md ${classes.surface} ${classes.surfaceBorder}`}
      style={classes.surfaceBorderStyle}
    >
      <h2
        className={`text-3xl text-center mb-8 ${classes.title}`}
        style={classes.titleStyle}
      >
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
        <p className="text-red-500 text-base mb-6 text-center font-semibold">
          {error}
        </p>
      )}

      <FormButton type="submit" isLoading={isLoading}>
        회원가입
      </FormButton>
    </form>
  );
};
