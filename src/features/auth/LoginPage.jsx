import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "./loginSchema";
import { useAuth } from "./useAuth";
import "./LoginPage.css";

export function LoginPage() {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { nameUser: "", pass: "" },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Iniciando sesión...");
    try {
      await handleLogin(data);
      toast.success("¡Bienvenido!", { id: toastId });
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Credenciales incorrectas", { id: toastId });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">Panel</div>
        <h4 className="auth-title">Iniciar sesión</h4>
        <p className="auth-subtitle">Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-wrapper">
            <ul className="wrapper">
              <li style={{ "--i": 3 }}>
                <input
                  className="input"
                  type="text"
                  placeholder="Usuario"
                  {...register("nameUser")}
                  autoComplete="username"
                />
                {errors.nameUser && (
                  <span className="field-error">{errors.nameUser.message}</span>
                )}
              </li>
              <li style={{ "--i": 2 }}>
                <input
                  className="input"
                  type="password"
                  placeholder="Contraseña"
                  {...register("pass")}
                  autoComplete="current-password"
                />
                {errors.pass && (
                  <span className="field-error">{errors.pass.message}</span>
                )}
              </li>
              <button type="submit" style={{ "--i": 1 }} disabled={loading}>
                {loading ? "Cargando..." : "Ingresar"}
              </button>
            </ul>
          </div>
        </form>

        <p className="auth-footer mt-5">
          ¿No tienes cuenta?{" "}
          <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
