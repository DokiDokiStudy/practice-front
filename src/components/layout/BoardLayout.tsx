// 게시판에 사용하는 민트색과 노란색의 조합 레이아웃
import { ReactNode } from "react";

// 레이아웃은 레이아웃끼리 모아야 하나 Or 게시판의 레이아웃이니까 게시판에 들어가야 하나.. 후자가 맞나
function BoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-100 flex-1 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          className="
            bg-[#FFF9C4] 
            border-[22px] border-[#B2EBF2]
            rounded-2xl 
            shadow-lg 
            p-8 
            min-h-[250px]
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default BoardLayout;
