import axios from "axios";

const productionApiUrl = "https://lostandfoundapi-production.up.railway.app/api";

// During local development, Vite forwards /api to the deployed API. This keeps
// requests same-origin in the browser and avoids the API's localhost CORS block.
export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "/api" : productionApiUrl);

export const getAssetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const serverOrigin = new URL(API_BASE_URL, window.location.origin).origin;
  return new URL(path, serverOrigin).toString();
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("token")) {
      window.dispatchEvent(new Event("auth:expired"));
    }

    return Promise.reject(error);
  }
);

export default api;
