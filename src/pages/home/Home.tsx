import { useFadeIn } from "@/shared/model";
import { useNavigate } from "@tanstack/react-router";

export function Home() {
  const fadeIn = useFadeIn(125);
  const navigate = useNavigate();
  const handleGoMain = () => {
    navigate({ to: "/main" });
  };

  return (
    <div
      className={`flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: "url('/images/dokydoky_main.png')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">환영합니다!!</h1>
        <button
          onClick={handleGoMain}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          메인페이지로 이동
        </button>
      </div>
    </div>
  );
}
