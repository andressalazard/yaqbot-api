import { z } from 'zod';

export const NewPlantOwnershipDTO = z.object({
  userid: z.string().uuid(),
  plant: z.object({
    id: z.string().uuid(),
    nickname: z
      .string()
      .trim()
      .min(1, 'el apodo de la planta no puede estar vacío')
      .max(36, 'el apodo de la planta no puede exceder los 36 caracteres')
      .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ'’ ]+$/,
        'el apodo de la planta solo puede contener letras y espacios.'
      )
      .transform((str) =>
        str
          .toLowerCase()
          .split(' ')
          .filter(Boolean)
          .map((w) => w[0]?.toUpperCase() + w.slice(1))
          .join(' ')
      ),
  }),
});

export type NewPlantOwnershipDTO = z.infer<typeof NewPlantOwnershipDTO>;
