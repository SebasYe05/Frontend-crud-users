import { z } from "zod";

export const registerSchema = z
  .object({
    nameUser: z
      .string()
      .min(1, "El usuario es obligatorio")
      .min(3, "Mínimo 3 caracteres"),
    fullName: z
      .string()
      .min(1, "El nombre completo es obligatorio")
      .min(3, "Mínimo 3 caracteres"),
    pass: z
      .string()
      .min(1, "La contraseña es obligatoria")
      .min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.pass === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
