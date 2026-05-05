import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema } from "./registerSchema";
import { useAuth } from "./useAuth";
import "./LoginPage.css";

export function RegisterPage() {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { nameUser: "", fullName: "", pass: "", confirmPassword: "" },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creando cuenta...");
    try {
      await handleRegister(data);
      toast.success("¡Cuenta creada exitosamente!", { id: toastId });
      navigate("/login");
    } catch (err) {
      toast.error(err?.message || "Error al registrar usuario", { id: toastId });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">Panel</div>
        <h4 className="auth-title">Crear cuenta</h4>
        <p className="auth-subtitle">Completa los datos para registrarte</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-wrapper">
            <ul className="wrapper register">
              <li style={{ "--i": 5 }}>
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
              <li style={{ "--i": 4 }}>
                <input
                  className="input"
                  type="text"
                  placeholder="Nombre completo"
                  {...register("fullName")}
                  autoComplete="name"
                />
                {errors.fullName && (
                  <span className="field-error">{errors.fullName.message}</span>
                )}
              </li>
              <li style={{ "--i": 3 }}>
                <input
                  className="input"
                  type="password"
                  placeholder="Contraseña"
                  {...register("pass")}
                  autoComplete="new-password"
                />
                {errors.pass && (
                  <span className="field-error">{errors.pass.message}</span>
                )}
              </li>
              <li style={{ "--i": 2 }}>
                <input
                  className="input"
                  type="password"
                  placeholder="Confirmar contraseña"
                  {...register("confirmPassword")}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <span className="field-error">{errors.confirmPassword.message}</span>
                )}
              </li>
              <button type="submit" style={{ "--i": 1 }} disabled={loading}>
                {loading ? "Cargando..." : "Registrarse"}
              </button>
            </ul>
          </div>
        </form>

        <p className="auth-footer mt-5">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}
