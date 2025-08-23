import { z } from 'zod';

export const CreateUserDto = z.object({
  username: z.string().min(2, 'el nombre debe tener al menos 2 caracteres').max(60, 'el nombre no puede tener más de 60 caracteres'),
  email: z.string().email('Formato de correo electrónico inválido').toLowerCase,
  password: z
    .string()
    .min(8, 'la contraseña debe tener al menos 6 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Debe incluir mayúscula, minúscula, y número'),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
