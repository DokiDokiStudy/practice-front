import { AuthLayout } from "@/shared/ui";
import { FindUserForm } from "@/features/auth";

export const FindUserPage = () => {
  return (
    <AuthLayout>
      <FindUserForm />
    </AuthLayout>
  );
};
