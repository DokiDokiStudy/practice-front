import axios from 'axios';

// 공통 통신부.. 실제 통신은 여기서 일어나지면 데이터 핸들링은 해당 스크립트를 호출한 곳에서 이루어져야 한다.
// EX) 리소스 컨버터 등등

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
  // 백엔드 CORS 상태에 따라 핸들링 필요
});

// 로컬스토리지의 토큰 헤더 등록
api.interceptors.request.use(
  (config) => {
    const userJson = localStorage.getItem('user');
    if (userJson && config.headers) {
      try {
        const { token } = JSON.parse(userJson);
        config.headers.Authorization = `Bearer ${token}`;
      } catch {
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
