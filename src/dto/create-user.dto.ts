import { z } from 'zod';

export const CreateUserDto = z.object({
  username: z
    .string()
    .min(2, 'El nombre de usuario debe tener al menos 2 caracteres')
    .max(60, 'El nombre de usuario no puede exceder los 60 caracteres'),
  email: z.string().email('Formato de correo electrónico inválido').toLowerCase(),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe incluir al menos una mayúscula, minúscula, un número y un caracter especial'
    ),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
