import { publicAxios } from './axiosInstance';

export const login = (email, password) => {
  return publicAxios.post('/api/v1/auth/login', { email, password });
};

export const register = (fullName, email, password) => {
  return publicAxios.post('/api/v1/auth/register', { fullName, email, password });
};
