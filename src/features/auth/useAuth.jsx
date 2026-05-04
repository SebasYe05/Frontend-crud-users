import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { login as loginService } from "./authService";

export function useAuth() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ username, password }) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await loginService({ username, password });
      login(data.token, { username, role: data.role });
      navigate("/users");
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
}
