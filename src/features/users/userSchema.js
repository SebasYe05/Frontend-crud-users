import { z } from "zod";

// Roles que maneja el backend: ROLE_ADMIN | ROLE_USER
export const userSchema = z.object({
  fullName:      z.string().min(1, "El nombre es requerido"),
  nameUser:  z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  pass:      z.string().min(6, "Mínimo 6 caracteres"),
  role:      z.enum(["ROLE_ADMIN", "ROLE_USER"], { message: "Selecciona un rol" }),
});

export const userEditSchema = z.object({
  fullName:     z.string().min(1, "El nombre es requerido"),
  nameUser: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  pass:     z.string().min(6, "Mínimo 6 caracteres").optional().or(z.literal("")),
  role:     z.enum(["ROLE_ADMIN", "ROLE_USER"], { message: "Selecciona un rol" }),
});
