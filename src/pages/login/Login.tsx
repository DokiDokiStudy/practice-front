import { LoginForm } from "@/features/auth";
import AuthLayout from "@/widgets/layout/ui/AuthLayout";

export function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
