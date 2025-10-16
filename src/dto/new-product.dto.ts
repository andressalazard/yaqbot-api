import { z } from 'zod';

export const NewProductDto = z.object({
  name: z
    .string()
    .min(6, 'El nombre del producto debe tener al menos 10 caracteres')
    .max(60, 'El nombre del producto no puede exceder los 60 caracteres')
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),
  description: z
    .string()
    .min(10, 'La descripción del producto debe tener al menos 10 caracteres')
    .max(600, 'La descripción del producto no puede exceder los 600 caracteres')
    .toLowerCase()
    .optional(),
  price: z
    .number()
    .refine((val) => val !== 0, { message: 'El precio debe ser distinto de cero' })
    .positive(),
  // .refine((val) => Number.isFinite(val) && /^\d+\.d{2}$/.test(val.toFixed(2)), {
  //   message: 'El precio debe tener exactamente dos valores decimales',
  // }),
  stock: z.number().positive(),
  category: z.enum(['PLANT', 'FERTILIZER', 'FLOWERPOT', 'TOOL', 'OTHER'], 'Categoría no válida'),
  image: z.array(z.string()).min(1, 'Debe existir por lo menos una imagen del producto'),
});

export type NewProductDto = z.infer<typeof NewProductDto>;
