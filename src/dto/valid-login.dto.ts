import { z } from 'zod';

export const ValidLoginDto = z.object({
  email: z.string().email('Formato de correo eletrónico inválido').toLowerCase(),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/(?=.*[a-z])/, 'La contraseña debe contener al menos una letra minúscula')
    .regex(/(?=.*[A-Z])/, 'La contraseña debe contener al menos una letra mayúscula')
    .regex(/(?=.*\d)/, 'La contraseña debe contener al menos un número'),
});
export type ValidLoginDto = z.infer<typeof ValidLoginDto>;
