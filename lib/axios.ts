import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});

export const apiPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});

apiPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
