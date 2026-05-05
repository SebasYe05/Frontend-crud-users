import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, userEditSchema } from "./userSchema";
import { FiX } from "react-icons/fi";

export function UserForm({ user, onSubmit, onClose }) {
  const isEditing = !!user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isEditing ? userEditSchema : userSchema),
    defaultValues: { nombre: "", apellido: "", email: "", password: "", role: "USER" },
  });

  useEffect(() => {
    if (user) reset({ ...user, password: "" });
  }, [user, reset]);

  const handleFormSubmit = async (data) => {
    if (isEditing && !data.password) delete data.password;
    await onSubmit(data);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>{isEditing ? "Editar usuario" : "Nuevo usuario"}</h3>
          <button className="modal-close" onClick={onClose} type="button">
            <FiX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Nombre</label>
                <input
                  className={`form-input ${errors.nombre ? "error" : ""}`}
                  {...register("nombre")}
                />
                {errors.nombre && <span className="form-error">{errors.nombre.message}</span>}
              </div>
              <div className="form-field">
                <label className="form-label">Apellido</label>
                <input
                  className={`form-input ${errors.apellido ? "error" : ""}`}
                  {...register("apellido")}
                />
                {errors.apellido && <span className="form-error">{errors.apellido.message}</span>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className={`form-input ${errors.email ? "error" : ""}`}
                {...register("email")}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">
                Contraseña
                {isEditing && <span className="form-hint">(vacío = sin cambios)</span>}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`form-input ${errors.password ? "error" : ""}`}
                {...register("password")}
              />
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Rol</label>
              <select
                className={`form-select ${errors.role ? "error" : ""}`}
                {...register("role")}
              >
                <option value="USER">Usuario</option>
                <option value="ROLE_ADMIN">Administrador</option>
              </select>
              {errors.role && <span className="form-error">{errors.role.message}</span>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <><span className="spinner" />Guardando...</>
              ) : isEditing ? "Guardar cambios" : "Crear usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
