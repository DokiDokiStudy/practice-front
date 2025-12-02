import { AuthLayout } from "@/shared/ui";
import { LoginForm } from "@/features/login";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
