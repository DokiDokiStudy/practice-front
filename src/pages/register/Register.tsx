import { RegisterForm } from "@/features/auth";
import { AuthLayout } from "@/widgets";

export function Register() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
