import { ReactNode } from "react";

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
