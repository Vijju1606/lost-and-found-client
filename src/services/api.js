import axios from "axios";

const productionApiUrl = "https://lostandfoundapi-production.up.railway.app/api";

// Vercel builds use this Railway API unless VITE_API_URL is explicitly set.
export const API_BASE_URL = import.meta.env.VITE_API_URL || productionApiUrl;

export const getAssetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const serverOrigin = new URL(API_BASE_URL, window.location.origin).origin;
  return new URL(path, serverOrigin).toString();
};

// Keep the image source tied to the file returned for an item.  Different
// found-item endpoints have used slightly different property names, and an
// absent `imageUrl` previously caused the UI to replace the uploaded image
// with the fallback icon.
export const getItemImageUrl = (item) => {
  if (!item) return "";

  return getAssetUrl(
    item.imageUrl ?? item.imageURL ?? item.imagePath ?? item.image ?? item.photoUrl ?? item.photoURL
  );
};

export const useImageFallback = (event) => {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied) return;

  image.dataset.fallbackApplied = "true";
  image.src = `${import.meta.env.BASE_URL}favicon.svg`;
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
