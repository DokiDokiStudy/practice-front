export function LoadingMsg({ message = "로딩 중…" }: { message?: string }) {
  return <p className="text-center py-20 text-gray-600">{message}</p>;
}
