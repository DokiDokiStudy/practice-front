import TopNav from "@/components/common/TopNav";
import BaseLayout from "./BaseLayout";

export default function MainLayout({ children }: { children: any }) {
  return (
    <>
      <TopNav />
      <BaseLayout>{children}</BaseLayout>
    </>
  );
}
