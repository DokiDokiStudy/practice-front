import TopNav from '../components/common/TopNav';
import MainBanner from './MainBanner';

function Main() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50 to-blue-100">
      <TopNav />
      <MainBanner/>
      <div className="flex-1 px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 카드 섹션 자리.. */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">콘텐츠 구분 {i}</h3>
              <p className="text-gray-600 text-sm">
                무엇인가 들어갈 자리임
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
