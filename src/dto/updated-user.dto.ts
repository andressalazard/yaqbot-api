import { z } from 'zod';

export const UpdateUserDto = z
  .object({
    username: z
      .string()
      .min(2, 'El nombre de usuario debe tener al menos 2 caracteres')
      .max(60, 'El nombre de usuario no puede exceder los 60 caracteres')
      .optional(),
    email: z.string().email('Formato de correo electrónico inválido').toLowerCase().optional(),
  })
  .strict();

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;
