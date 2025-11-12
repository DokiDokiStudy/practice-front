import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(JSON.parse(token));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(null);
  };

  return { isLogin, logout };
};
