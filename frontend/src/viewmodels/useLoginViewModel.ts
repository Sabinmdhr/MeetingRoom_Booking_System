import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginFormInputs } from "../models/auth.model";
import { loginService, logoutService } from "../services/auth.service";

export const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      setError(null);
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
      const result = await loginService(data);

      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);

      console.log("Login Success:", result);
      navigate("/dashboard");
      return result;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login Failed");
      console.error("Login Failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    }
  };
  return { login, loading, error, logout };
};
