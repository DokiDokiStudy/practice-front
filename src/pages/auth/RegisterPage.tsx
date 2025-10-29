import { AuthLayout } from "@/shared/ui";
import { RegisterForm } from "@/features/auth";

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
