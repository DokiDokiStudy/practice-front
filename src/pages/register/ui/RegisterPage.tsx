import { AuthLayout } from "@/shared/ui";
import { RegisterForm } from "@/features/register";

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
