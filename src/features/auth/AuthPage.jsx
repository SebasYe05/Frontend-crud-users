import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { loginSchema } from "./loginSchema";
import { registerSchema } from "./registerSchema";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

/* ── LOGIN ─────────────────────────────────────────────── */
function LoginFace({ onFlip }) {
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
    const tid = toast.loading("Iniciando sesión...");
    try {
      await handleLogin(data);
      toast.success("¡Bienvenido!", { id: tid });
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.mensaje || "Credenciales incorrectas", {
        id: tid,
      });
    }
  };

  return (
    <div className="auth-face auth-face--front">
      <div className="auth-brand">BIENVENIDO</div>
      <h2 className="auth-title">Iniciar sesión</h2>
      <p className="auth-subtitle mb-5">Ingresa tus credenciales para continuar</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="iso-form-wrap">
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
        <button className="auth-link-btn" onClick={onFlip} type="button">
          Regístrate aquí
        </button>
      </p>
    </div>
  );
}

/* ── SIGNUP ──────────────────────────────────────────── */
function RegisterFace({ onFlip }) {
  const { handleRegister, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nameUser: "",
      fullName: "",
      pass: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const tid = toast.loading("Creando cuenta...");
    try {
      await handleRegister(data);
      toast.success("¡Cuenta creada! Inicia sesión.", { id: tid });
      onFlip(); 
    } catch (err) {
      toast.error(err?.response?.data?.mensaje || "Error al registrar", {
        id: tid,
      });
    }
  };

  return (
    <div className="auth-face auth-face--back">
      <div className="auth-brand">BIENVENIDO</div>
      <h2 className="auth-title">Crear cuenta</h2>
      <p className="auth-subtitle mb-5">Completa los datos para registrarte</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="iso-form-wrap">
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
                <span className="field-error">
                  {errors.confirmPassword.message}
                </span>
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
        <button className="auth-link-btn" onClick={onFlip} type="button">
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
}

/* ── FLIP CARD WRAPPER ──────────────────────────────────────── */
export function AuthPage() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="auth-scene">
      {/* Decorative blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className={`auth-flipper ${flipped ? "is-flipped" : ""}`}>
        <LoginFace onFlip={() => setFlipped(true)} />
        <RegisterFace onFlip={() => setFlipped(false)} />
      </div>
    </div>
  );
}
