import api from '@/lib/api';

export interface UserProfile { id: number; email: string; nickName: string; }

export const fetchMe = (): Promise<UserProfile> =>
  api.get('/users/me').then(res => res.data);
