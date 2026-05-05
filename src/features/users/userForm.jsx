import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, userEditSchema } from "./userSchema";
import { FiX } from "react-icons/fi";
import "./UserForm.css";

export function UserForm({ user, onSubmit, onClose }) {
  const isEditing = !!user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isEditing ? userEditSchema : userSchema),
    defaultValues: {
      nameUser: "",
      fullName: "",
      bio: "",
      pass: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) reset({ ...user, pass: "", confirmPassword: "" });
  }, [user, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    onClose();
  };

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <div className="modal-header">
          <h3>{isEditing ? "Editar usuario" : "Nuevo usuario"}</h3>
          <button className="modal-close" onClick={onClose} type="button">
            <FiX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="modal-body">
            {/* nameUser */}
            <div className="form-field">
              <label className="form-label">Usuario</label>
              <input
                className={`form-input ${errors.nameUser ? "error" : ""}`}
                placeholder="nombre_usuario"
                {...register("nameUser")}
              />
              {errors.nameUser && (
                <span className="form-error">{errors.nameUser.message}</span>
              )}
            </div>

            {/* fullName */}
            <div className="form-field">
              <label className="form-label">Nombre completo</label>
              <input
                className={`form-input ${errors.fullName ? "error" : ""}`}
                placeholder="Nombres y apellidos"
                {...register("fullName")}
              />
              {errors.fullName && (
                <span className="form-error">{errors.fullName.message}</span>
              )}
            </div>

            {/* bio — solo al editar */}
            {isEditing && (
              <div className="form-field">
                <label className="form-label">Biografía</label>
                <input
                  className={`form-input ${errors.bio ? "error" : ""}`}
                  placeholder="Breve descripción del usuario"
                  {...register("bio")}
                />
                {errors.bio && (
                  <span className="form-error">{errors.bio.message}</span>
                )}
              </div>
            )}

            {/* pass */}
            <div className="form-field">
              <label className="form-label">
                Contraseña
                {isEditing && (
                  <span className="form-hint">(vacío = sin cambios)</span>
                )}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`form-input ${errors.pass ? "error" : ""}`}
                {...register("pass")}
              />
              {errors.pass && (
                <span className="form-error">{errors.pass.message}</span>
              )}
            </div>

            {/* confirmPassword */}
            <div className="form-field">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="form-error">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" />
                  Guardando...
                </>
              ) : isEditing ? (
                "Guardar cambios"
              ) : (
                "Crear usuario"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
