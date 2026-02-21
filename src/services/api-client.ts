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
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.get(`${env.VITE_API_URL}/user/refresh-token`, {
                    withCredentials: true
                });

                return apiClient(originalRequest);
            } catch (refreshError) {
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
