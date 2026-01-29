import { ReactNode } from "react";

export function BoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-100 flex-1 py-12 px-4 overflow-hidden flex flex-col">
      <div
        className="w-3/4 mx-auto flex flex-col flex-1 overflow-hidden
            bg-[#FFF9C4]
            border-[22px] border-[#B2EBF2]
            rounded-2xl
            shadow-lg
            p-8
          "
      >
        {children}
      </div>
    </div>
  );
}
