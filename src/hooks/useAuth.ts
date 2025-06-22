import { useEffect, useState } from 'react';

// 유저 정보 가져오기
type User = {
  nickName: string;
  token: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const nickName = localStorage.getItem('nickName');

    if (token && nickName) {
      setUser({ token, nickName });
    }
  }, []);

  return { user };
};