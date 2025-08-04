import TopNav from '@/components/common/TopNav';

export default function MainLayout({ children }: { children: any }) {
  return (
    <>
      <TopNav />
      {children}
    </>
  );
}
