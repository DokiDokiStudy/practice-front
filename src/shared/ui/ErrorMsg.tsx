export function ErrorMessage({ message }: { message?: string }) {
  return (
    <p className="text-center py-20 text-red-500">
      에러 발생: {message || "알 수 없는 오류가 발생했습니다."}
    </p>
  );
}
