import { AuthLayout } from "@/shared/ui";
import { LoginForm } from "@/features/auth";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
