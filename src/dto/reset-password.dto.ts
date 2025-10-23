import { z } from 'zod';

export const resetPasswordSchema = z.object({
  newPassword: z
    .string({ message: 'La nueva contraseña es requerida' })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(100, { message: 'La contraseña no puede tener más de 100 caracteres' })
    .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
    .regex(/[a-z]/, { message: 'La contraseña debe contener al menos una letra minúscula' })
    .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número' }),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
