import { CardButton } from "@/shared/ui";
import MainBanner from "./MainBanner";

function Main() {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-white via-blue-50 to-blue-100">
      <MainBanner />
      <div className="flex-1 px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardButton
            to="/docker-docs"
            title="🐳 Docker Docs"
            description="도커 개발 환경 구성 및 실행 방법을 확인할 수 있습니다."
          />

          {[2, 3].map((i) => (
            <CardButton
              key={i}
              title={`콘텐츠 구분 ${i}`}
              description="무엇인가 들어갈 자리임"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
