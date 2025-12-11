import axios from "axios";
import { getClerk } from "@clerk/clerk-react";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// attach token to every request
axiosInstance.interceptors.request.use(async (config) => {
  const clerk = getClerk();

  // Clerk may not be loaded instantly
  if (!clerk || !clerk.session) return config;

  const token = await clerk.session.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
