import { z } from 'zod';

export const NewPlantDetailsDTO = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos dos caracteres')
    .max(100, 'El nombre de la planta no puede exceder los cien caracteres'),
  type: z
    .string()
    .min(2, 'El tipo de planta de tener al menos dos caracteres')
    .max(60, 'El tipo de planta no puede exceder los sesenta caracteres'),
  maxHeight: z.number().positive('La altura máxima debe ser un número positivo').optional(),
  wateringMode: z.enum(['HIGH', 'MODERATE', 'LOW'], 'Modo de riego de la planta inválido'),
  wateringFrequency: z
    .number()
    .positive('La frecuencia de riego de la planta debe ser un número positivo')
    .optional(),
  weather: z
    .array(
      z.enum(
        [
          'CLEAR',
          'CLOUDY',
          'PARTIALLY_CLOUDLY',
          'OVERCAST',
          'GLOOMY',
          'BRIGHT',
          'DARK',
          'FOGGY',
          'MISTY',
          'HAZY',
          'DAMP',
        ],
        'Clima de la planta inválido'
      ),
      'El clima de la planta debe tener al menos un valor'
    )
    .min(1),
  light: z.enum(
    ['FULL_SUNLIGHT', 'PARTIAL_LIGHT', 'INDIRECT_SUNLIGHT', 'DAPPLED_LIGHT', 'SHADE'],
    'luz de planta inválida'
  ),
  specialCares: z
    .string()
    .max(500, 'Lo cuidados de la planta no pueden exceder los 500 caracteres')
    .optional(),
});

export type NewPlantDetailsDTO = z.infer<typeof NewPlantDetailsDTO>;
