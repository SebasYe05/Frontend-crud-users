import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, userEditSchema } from "./userSchema";

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
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  // Carga los datos del usuario al editar
  useEffect(() => {
    if (user) reset({ ...user, password: "" });
  }, [user, reset]);

  const handleFormSubmit = async (data) => {
    // Si password vacío al editar, no lo enviamos
    if (isEditing && !data.password) delete data.password;
    await onSubmit(data);
    onClose();
  };

  return (
    <div
      className="modal show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditing ? "Editar usuario" : "Nuevo usuario"}
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <div className="modal-body">
              <div className="row g-3">
                {/* Nombre */}
                <div className="col-6">
                  <label className="form-label">Nombre</label>
                  <input
                    className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                    {...register("nombre")}
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback">
                      {errors.nombre.message}
                    </div>
                  )}
                </div>

                {/* Apellido */}
                <div className="col-6">
                  <label className="form-label">Apellido</label>
                  <input
                    className={`form-control ${errors.apellido ? "is-invalid" : ""}`}
                    {...register("apellido")}
                  />
                  {errors.apellido && (
                    <div className="invalid-feedback">
                      {errors.apellido.message}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="col-12">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="col-12">
                  <label className="form-label">
                    Contraseña
                    {isEditing && (
                      <span
                        className="text-muted ms-1"
                        style={{ fontSize: 12 }}
                      >
                        (dejar vacío para no cambiar)
                      </span>
                    )}
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Rol */}
                <div className="col-12">
                  <label className="form-label">Rol</label>
                  <select
                    className={`form-select ${errors.role ? "is-invalid" : ""}`}
                    {...register("role")}
                  >
                    <option value="USER">Usuario</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                  {errors.role && (
                    <div className="invalid-feedback">
                      {errors.role.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
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
    </div>
  );
}
