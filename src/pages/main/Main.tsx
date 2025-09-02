import { Link } from "@tanstack/react-router";
import MainBanner from "./MainBanner";

function Main() {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-white via-blue-50 to-blue-100">
      <MainBanner />
      <div className="flex-1 px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/docker-docs" className="block">
            <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition hover:bg-blue-100">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                🐳 Docker Docs
              </h3>
              <p className="text-gray-600 text-sm">
                도커 개발 환경 구성 및 실행 방법을 확인할 수 있습니다.
              </p>
            </div>
          </Link>

          {[2, 3].map((i) => (
            <div
              key={i}
              className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                콘텐츠 구분 {i}
              </h3>
              <p className="text-gray-600 text-sm">무엇인가 들어갈 자리임</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
