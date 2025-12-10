import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await authApi.getMe();
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      // Not authenticated
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (googleToken) => {
    try {
      const response = await authApi.googleAuth(googleToken);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "Authentication failed" };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      setIsAuthenticated(false);
      queryClient.clear();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    loginWithGoogle,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};