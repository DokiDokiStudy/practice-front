import { RegisterForm } from "@/features/auth";
import { AuthLayout } from "@/widgets/_common";

export function Register() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
