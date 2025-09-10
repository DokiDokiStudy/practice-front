import { LoginForm } from "@/features/auth";
import { AuthLayout } from "@/widgets/_common";

export function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
