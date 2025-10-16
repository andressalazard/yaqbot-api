import { z } from 'zod';

export const ValidLoginDto = z.object({
  email: z.string().email('Formato de correo eletrónico inválido').toLowerCase(),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe incluir al menos una mayúscula, minúscula, un número y un caracter especial'
    ),
});
export type ValidLoginDto = z.infer<typeof ValidLoginDto>;
