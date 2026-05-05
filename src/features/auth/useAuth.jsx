import { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { login as loginService, register as registerService } from "./authService";

export function useAuth() {
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);

  // Sends { nameUser, pass } → receives LoginResponseDTO
  const handleLogin = async ({ nameUser, pass }) => {
    setLoading(true);
    try {
      const { data } = await loginService({ nameUser, pass });
      // Store user with fields from LoginResponseDTO
      login(data.token, {
        username:      data.userName,
        fullName:      data.nombreCompleto,
        bio:           data.bio,
        role:          data.role,  // "ROLE_ADMIN" | "ROLE_USER"
      });
    } finally {
      setLoading(false);
    }
  };

  // Sends { nameUser, fullName, pass, confirmPassword }
  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      await registerService({
        nameUser:        formData.nameUser,
        fullName:        formData.fullName,
        pass:            formData.pass,
        confirmPassword: formData.confirmPassword,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, loading };
}