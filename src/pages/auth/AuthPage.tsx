import { AuthLayout } from "@/shared/ui";
import {
  RegisterForm,
  FindUserForm,
  FindPwdForm,
  LoginForm,
} from "@/features/auth";
import { useSearch } from "@tanstack/react-router";

type AuthMode = "login" | "register" | "find-user" | "find-pwd";

export const AuthPage = () => {
  const search = useSearch({ from: "/auth" });
  const mode = (search?.mode as AuthMode) || "login";

  const renderForm = () => {
    switch (mode) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      case "find-user":
        return <FindUserForm />;
      case "find-pwd":
        return <FindPwdForm />;
      default:
        return <LoginForm />;
    }
  };

  return <AuthLayout>{renderForm()}</AuthLayout>;
};
