import { z } from 'zod';

export const verifyResetTokenSchema = z.object({
  token: z
    .string({ message: 'El token es requerido' })
    .min(32, { message: 'Token inválido' })
    .trim(),
});

export type VerifyResetTokenDto = z.infer<typeof verifyResetTokenSchema>;
