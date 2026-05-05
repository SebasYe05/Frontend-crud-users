import { z } from "zod";

// Esquema de validación para crear un nuevo usuario
export const userSchema = z
  .object({
    nameUser: z.string().min(3, "Mínimo 3 caracteres"),
    fullName: z.string().min(1, "El nombre completo es requerido"),
    pass: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirma la contraseña"),
  })
  .refine((d) => d.pass === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Esquema de validación para editar un usuario existente
export const userEditSchema = z
  .object({
    nameUser: z.string().min(3, "Mínimo 3 caracteres"),
    fullName: z.string().min(1, "El nombre completo es requerido"),
    bio: z.string().optional().default(""),
    pass: z.string().min(6, "Mínimo 6 caracteres").optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine((d) => !d.pass || d.pass === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
