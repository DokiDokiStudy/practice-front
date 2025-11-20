import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextValue {
  isLogin: string | null;
  setIsLogin: (value: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
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

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
