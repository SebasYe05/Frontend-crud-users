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
      
      // Mapeamos los campos para que coincidan con la DTO del backend
      const payload = {
        nameUser: username,
        pass: password,
      };

       const { data } = await loginService(payload);
       const roleMap = { ADMIN: "ROLE_ADMIN", USER: "ROLE_USER" };
       const mappedRole = roleMap[data.role] || data.role;
       login(data.token, { username, role: mappedRole });
       navigate("/users");
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
}