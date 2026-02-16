import axios from 'axios';
import { env } from '@/config/env';

export const apiClient = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message;
        console.error('سرور دچار مشکل شده است:', message);

        return Promise.reject(error);
    }
);
