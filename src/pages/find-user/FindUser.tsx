import { FindUserForm } from "@/features/auth";
import { AuthLayout } from "@/widgets/_common";

export function FindUser() {
  return (
    <AuthLayout>
      <FindUserForm />
    </AuthLayout>
  );
}
