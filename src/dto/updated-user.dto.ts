import { z } from 'zod';

export const UpdateUserDto = z
  .object({
    username: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(20, 'El nombre no puede exceder 20 caracteres').optional(),

    email: z.string().email('Formato de email no válido').toLowerCase().optional(),

    role: z.string().optional(),
  })
  .strict();

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;
