import { TopNav } from "@/widgets/navigation";

export default function MainLayout({ children }: { children: any }) {
  return (
    <>
      <TopNav />
      {children}
    </>
  );
}
