import { useEffect, useState } from 'react';

// 유저 정보 가져오기
// TODO : email 넣어놓자
// 근데 게시글 조회 시 author는 닉네임 비교 맞아여?
type User = {
  nickName: string;
  token: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      setUser(JSON.parse(userJson));
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, isLoading, logout };
};
