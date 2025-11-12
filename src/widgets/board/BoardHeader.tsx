import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/shared/ui";
import { useAuth } from "@/features/auth";

export const BoardHeader = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">📌 게시판</h2>
      {isLogin ? (
        <Link to="/board/write">
          <Button size="md" color="teal">
            글쓰기
          </Button>
        </Link>
      ) : (
        <Button
          size="md"
          color="gray"
          disabled
          onClick={() => navigate({ to: "/auth/login" })}
        >
          로그인 후 쓰기 가능
        </Button>
      )}
    </div>
  );
};
