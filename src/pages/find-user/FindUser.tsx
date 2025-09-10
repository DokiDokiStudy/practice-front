import { AuthLayout } from "@/widgets";
import { FindUserForm } from "@/features/auth";

export function FindUser() {
  return (
    <AuthLayout>
      <FindUserForm />
    </AuthLayout>
  );
}
