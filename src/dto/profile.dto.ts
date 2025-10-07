import { z } from 'zod';

export const ProfileDto = z.object({
  fullname: z
    .string()
    .min(10, 'El nombre completo debe tener al menos 10 caracteres')
    .max(60, 'El nombre completo no debe exceder los 60 caracteres')
    .optional(), //later on we will delete this line
  phone: z.string().max(10, 'El número de contacto no debe exceder los 10 caracteres').optional(), //later on we will delete this line
  region: z.string().min(5, 'Localidad debe tener al menos 5 caracteres').max(60, 'Localidad no debe exceder los 60 caracteres').optional(), //later on we will delete this line
  address: z
    .string()
    .min(20, 'Dirección de contacto debe tener al menos 20 caracteres')
    .max(150, 'Dirección de contacto no debe exceder los 150 caracteres')
    .optional(), //later on we will delete this line
  birthday: z.string().max(8, 'Fecha de nacimiento no debe exceder los 8 caracteres').optional(), //later on we will delete this line
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], 'Género no válido'),
  avatar: z.string().optional(),
  bio: z.string().max(150, 'La biografía no debe exceder los 150 caracteres').optional(), //later on we will delete this line
});

export type ProfileDto = z.infer<typeof ProfileDto>;
