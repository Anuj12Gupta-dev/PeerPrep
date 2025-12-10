import axiosInstance from "../lib/axios";

export const authApi = {
  googleAuth: async (token) => {
    const response = await axiosInstance.post("/auth/google", { token });
    return response.data;
  },

  getMe: async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },
};