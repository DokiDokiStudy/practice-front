// 게시판에 사용하는 민트색과 노란색의 조합 레이아웃
import { ReactNode } from "react";

// 레이아웃은 레이아웃끼리 모아야 하나 Or 게시판의 레이아웃이니까 게시판에 들어가야 하나.. 후자가 맞나
function BoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
      <div className="w-full max-w-6xl border-[22px] border-[#B2EBF2] bg-[#FFF9C4] rounded-[20px] shadow-lg p-8">
        {children}
      </div>
    </div>
  );
}

export default BoardLayout;
