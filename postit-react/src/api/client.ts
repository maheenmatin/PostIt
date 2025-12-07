import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { AuthenticationResponse, RefreshTokenRequest } from './types';

const API_BASE_URL = 'http://localhost:8080';

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const USERNAME_KEY = 'username';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Attach access token on every request (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401/403 by trying refresh token once
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshed = await refreshToken();
        if (refreshed) {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
          };
          return api(originalRequest);
        }
      } catch (refreshError) {
        clearAuthStorage();
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// ────────── Auth helpers ──────────

export function storeAuth(auth: AuthenticationResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, auth.authenticationToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, auth.refreshToken);
  localStorage.setItem(USERNAME_KEY, auth.username);
}

export function clearAuthStorage() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

export function getStoredUsername(): string | null {
  return localStorage.getItem(USERNAME_KEY);
}

async function refreshToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const username = localStorage.getItem(USERNAME_KEY);

  if (!refreshToken || !username) {
    return false;
  }

  const payload: RefreshTokenRequest = { refreshToken, username };

  const { data } = await axios.post<AuthenticationResponse>(
    `${API_BASE_URL}/api/auth/refresh/token`,
    payload
  );

  storeAuth(data);
  return true;
}
