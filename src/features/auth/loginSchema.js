import { z } from "zod";

// Definimos y exportamos el esquema de validación llamado 'loginSchema'.
export const loginSchema = z.object({
   
   // 1. Validación para el campo 'username':
   nameUser: z.string()
     // Asegura que no esté vacío (mínimo 1 carácter) y muestra un mensaje si falla.
     .min(1, "El nombre de usuario es requerido"),

   // 2. Validación para el campo 'password':
   pass: z.string()
     // Verifica que la contraseña tenga al menos 6 caracteres de longitud.
     .min(6, "Mínimo 6 caracteres"),   

});