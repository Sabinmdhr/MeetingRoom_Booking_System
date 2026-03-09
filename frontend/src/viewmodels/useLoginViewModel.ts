import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginFormInputs } from "../models/auth.model";
import { loginService } from "../services/auth.service";

export const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      setError(null);

      const result = await loginService(data);

      localStorage.setItem("accesstoken", result.data.accessToken);
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

  return { login, loading, error };
};
