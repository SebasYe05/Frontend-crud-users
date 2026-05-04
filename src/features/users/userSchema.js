import { z } from "zod";

export const userSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  role: z.enum(["ADMIN", "USER"], { message: "Selecciona un rol" }),
});

export const userEditSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres").optional(),
  role: z.enum(["ADMIN", "USER"], { message: "Selecciona un rol" }),
});
