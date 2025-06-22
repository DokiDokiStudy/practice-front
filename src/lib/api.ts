import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
  // 백엔드 CORS 상태에 따라 핸들링 필요
});

// 로컬스토리지의 토큰 헤더 등록
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
);

// 이 페이지를 직접 호출 하지 말고 호출부 생성하여 거기서 관리 필요
// 호출부에서 응답을 컨버팅해서 주는 패턴으로
// 마치 Controller처럼 해야함

export default api;
