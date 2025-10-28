import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: 'El email es requerido' })
    .email({ message: 'Email inválido' })
    .toLowerCase()
    .trim(),
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
